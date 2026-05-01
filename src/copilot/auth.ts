import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  CopilotAuthManagerOptions,
  CopilotAuthRecord,
  Logger,
  OAuthDeviceCodeResponse,
  OAuthTokenResponse,
} from './interfaces.js';

const DEFAULT_CLIENT_ID = process.env.COPILOT_CLIENT_ID || 'Ov23li8tweQw6odWQebz';
const DEFAULT_AUTH_FILE_PATH = path.resolve(process.cwd(), '.copilot/auth.json');
const DEFAULT_SCOPE = 'read:user';
const EXPIRY_SKEW_MS = 30_000;

const normalizeDomain = (value: string): string => {
  return value.replace(/^https?:\/\//, '').replace(/\/$/, '');
};

const resolveOAuthDomain = (enterpriseUrl?: string): string => {
  if (!enterpriseUrl) return 'github.com';
  return normalizeDomain(enterpriseUrl);
};

const resolveOAuthEndpoints = (
  enterpriseUrl?: string
): { deviceCodeUrl: string; tokenUrl: string } => {
  const domain = resolveOAuthDomain(enterpriseUrl);
  return {
    deviceCodeUrl: `https://${domain}/login/device/code`,
    tokenUrl: `https://${domain}/login/oauth/access_token`,
  };
};

const isExpired = (expiresAt: number): boolean => {
  return Date.now() + EXPIRY_SKEW_MS >= expiresAt;
};

const getStaticCopilotToken = (): string | undefined => {
  const token = process.env.COPILOT_TOKEN?.trim();
  return token || undefined;
};

const parseJsonOrThrow = async <T>(response: Response, context: string): Promise<T> => {
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${context} falhou com status ${response.status}: ${body.slice(0, 400)}`);
  }

  return (await response.json()) as T;
};

class CopilotAuthManager {
  private authFilePath: string;
  private enterpriseUrl?: string;
  private clientId: string;
  private logger: Logger;
  private cache?: CopilotAuthRecord;

  constructor(options: CopilotAuthManagerOptions = {}) {
    this.authFilePath = options.authFilePath || DEFAULT_AUTH_FILE_PATH;
    this.enterpriseUrl = options.enterpriseUrl;
    this.clientId = options.clientId || DEFAULT_CLIENT_ID;
    this.logger = options.logger || console;
  }

  private async loadAuthRecord(): Promise<CopilotAuthRecord | undefined> {
    if (this.cache) return this.cache;

    const raw = await readFile(this.authFilePath, 'utf8').catch(() => undefined);
    if (!raw) return undefined;

    const parsed = JSON.parse(raw) as Partial<CopilotAuthRecord>;
    if (!parsed.accessToken || !parsed.expiresAt) return undefined;

    const record: CopilotAuthRecord = {
      accessToken: parsed.accessToken,
      refreshToken: parsed.refreshToken,
      expiresAt: parsed.expiresAt,
      tokenType: 'bearer',
      enterpriseUrl: parsed.enterpriseUrl,
    };

    this.cache = record;
    return record;
  }

  private async saveAuthRecord(record: CopilotAuthRecord): Promise<void> {
    const dir = path.dirname(this.authFilePath);
    await mkdir(dir, { recursive: true });
    await writeFile(this.authFilePath, JSON.stringify(record, null, 2), 'utf8');
    this.cache = record;
  }

  private async requestDeviceCode(enterpriseUrl?: string): Promise<OAuthDeviceCodeResponse> {
    const endpoints = resolveOAuthEndpoints(enterpriseUrl || this.enterpriseUrl);
    const response = await fetch(endpoints.deviceCodeUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: this.clientId,
        scope: DEFAULT_SCOPE,
      }),
    });

    return parseJsonOrThrow<OAuthDeviceCodeResponse>(response, 'Solicitacao do device code');
  }

  private async requestTokenByDeviceCode(
    deviceCode: string,
    enterpriseUrl?: string
  ): Promise<OAuthTokenResponse> {
    const endpoints = resolveOAuthEndpoints(enterpriseUrl || this.enterpriseUrl);
    const response = await fetch(endpoints.tokenUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: this.clientId,
        device_code: deviceCode,
        grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
      }),
    });

    return parseJsonOrThrow<OAuthTokenResponse>(response, 'Polling do OAuth token');
  }

  private async requestTokenByRefreshToken(
    refreshToken: string,
    enterpriseUrl?: string
  ): Promise<OAuthTokenResponse> {
    const endpoints = resolveOAuthEndpoints(enterpriseUrl || this.enterpriseUrl);
    const response = await fetch(endpoints.tokenUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: this.clientId,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    return parseJsonOrThrow<OAuthTokenResponse>(response, 'Refresh do OAuth token');
  }

  async authorizeDeviceCodeFlow(enterpriseUrl?: string): Promise<CopilotAuthRecord> {
    const selectedEnterpriseUrl = enterpriseUrl || this.enterpriseUrl;
    const device = await this.requestDeviceCode(selectedEnterpriseUrl);

    this.logger.info(
      `\nAutenticacao Copilot: acesse ${device.verification_uri} e informe o codigo ${device.user_code}\n`
    );

    const timeoutAt = Date.now() + device.expires_in * 1000;
    let intervalMs = Math.max(1, device.interval) * 1000;

    while (Date.now() < timeoutAt) {
      await new Promise((resolve) => setTimeout(resolve, intervalMs));
      const token = await this.requestTokenByDeviceCode(device.device_code, selectedEnterpriseUrl);

      if (token.access_token) {
        const record: CopilotAuthRecord = {
          accessToken: token.access_token,
          refreshToken: token.refresh_token,
          expiresAt: Date.now() + Math.max(60, token.expires_in || 3600) * 1000,
          tokenType: 'bearer',
          enterpriseUrl: selectedEnterpriseUrl,
        };
        await this.saveAuthRecord(record);
        this.logger.info(`Credenciais salvas em ${this.authFilePath}`);
        return record;
      }

      if (token.error === 'authorization_pending') {
        continue;
      }

      if (token.error === 'slow_down') {
        intervalMs += 5000;
        continue;
      }

      throw new Error(`Falha no OAuth Device Flow: ${token.error || 'erro desconhecido'}`);
    }

    throw new Error('Tempo esgotado aguardando autorizacao no OAuth Device Flow.');
  }

  async refreshAccessToken(): Promise<string> {
    const staticToken = getStaticCopilotToken();
    if (staticToken) {
      return staticToken;
    }

    const record = await this.loadAuthRecord();
    if (!record) {
      const created = await this.authorizeDeviceCodeFlow(this.enterpriseUrl);
      return created.accessToken;
    }

    if (!record.refreshToken) {
      this.logger.warn('Refresh token ausente. Iniciando novo OAuth Device Flow...');
      const created = await this.authorizeDeviceCodeFlow(
        record.enterpriseUrl || this.enterpriseUrl
      );
      return created.accessToken;
    }

    const token = await this.requestTokenByRefreshToken(
      record.refreshToken,
      record.enterpriseUrl || this.enterpriseUrl
    );
    if (!token.access_token) {
      this.logger.warn('Refresh token falhou. Iniciando novo OAuth Device Flow...');
      const created = await this.authorizeDeviceCodeFlow(
        record.enterpriseUrl || this.enterpriseUrl
      );
      return created.accessToken;
    }

    const refreshed: CopilotAuthRecord = {
      accessToken: token.access_token,
      refreshToken: token.refresh_token || record.refreshToken,
      expiresAt: Date.now() + Math.max(60, token.expires_in || 3600) * 1000,
      tokenType: 'bearer',
      enterpriseUrl: record.enterpriseUrl,
    };

    await this.saveAuthRecord(refreshed);
    this.logger.info('Token OAuth renovado com sucesso.');
    return refreshed.accessToken;
  }

  async getValidAccessToken(): Promise<string> {
    const staticToken = getStaticCopilotToken();
    if (staticToken) {
      return staticToken;
    }

    const record = await this.loadAuthRecord();
    if (!record) {
      const created = await this.authorizeDeviceCodeFlow(this.enterpriseUrl);
      return created.accessToken;
    }

    if (!isExpired(record.expiresAt)) {
      return record.accessToken;
    }

    this.logger.info('Token expirado. Renovando token OAuth...');
    return this.refreshAccessToken();
  }

  async getAuthRecord(): Promise<CopilotAuthRecord | undefined> {
    return this.loadAuthRecord();
  }
}

const createCopilotAuthManager = (options: CopilotAuthManagerOptions = {}): CopilotAuthManager => {
  return new CopilotAuthManager(options);
};

export { CopilotAuthManager, createCopilotAuthManager, DEFAULT_AUTH_FILE_PATH, normalizeDomain };
