#!/usr/bin/env node
/**
 * Builds a Node.js Single Executable Application (SEA).
 * Requires Node.js 20+ and postject (npm install -g postject).
 */
import { execSync } from 'node:child_process';
import { copyFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const DIST = join(ROOT, 'dist');
const SEA_CONFIG = join(DIST, 'sea-config.json');
const BLOB = join(DIST, 'sea-prep.blob');
const OUTPUT = join(DIST, 'mcp-frontend');
const BUNDLE = join(DIST, 'mcp-frontend.cjs');

// 1. Write sea-config.json
writeFileSync(
  SEA_CONFIG,
  JSON.stringify({
    main: BUNDLE,
    output: BLOB,
    disableExperimentalSEAWarning: true,
  })
);

// 2. Generate the blob
console.log('Generating SEA blob...');
execSync(`node --experimental-sea-config ${SEA_CONFIG}`, { stdio: 'inherit' });

// 3. Copy node binary to output path
const nodeBin = process.execPath;
console.log(`Copying node binary from ${nodeBin}...`);
copyFileSync(nodeBin, OUTPUT);
execSync(`chmod +x ${OUTPUT}`);

// 4. Remove existing signature (macOS only — no-op on Linux)
// On Linux we skip codesign steps

// 5. Inject the blob
console.log('Injecting SEA blob with postject...');
execSync(
  `postject ${OUTPUT} NODE_SEA_BLOB ${BLOB} --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2`,
  { stdio: 'inherit' }
);

console.log(`\nDone! Binary: ${OUTPUT}`);
