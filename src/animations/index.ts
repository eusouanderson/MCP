import chalk from 'chalk';
import logSymbols from 'log-symbols';
import ora from 'ora';

type LoadingHandle = {
  stop: () => void;
};

const DIVIDER_LENGTH = 56;

const divider = (label?: string): void => {
  if (!label) {
    console.log(chalk.gray('─'.repeat(DIVIDER_LENGTH)));
    return;
  }

  const normalized = ` ${label.trim().toUpperCase()} `;
  const side = Math.max(2, Math.floor((DIVIDER_LENGTH - normalized.length) / 2));
  const right = Math.max(2, DIVIDER_LENGTH - normalized.length - side);
  console.log(chalk.gray(`${'─'.repeat(side)}${normalized}${'─'.repeat(right)}`));
};

const loading = (message: string): LoadingHandle => {
  const spinner = ora({ text: message, spinner: 'dots' }).start();
  return {
    stop: () => {
      spinner.stop();
    },
  };
};

const success = async (message: string): Promise<void> => {
  console.log(`${logSymbols.success} ${chalk.green(message)}`);
};

const error = async (message: string): Promise<void> => {
  console.error(`${logSymbols.error} ${chalk.red(message)}`);
};

const message = async (message: string): Promise<void> => {
  console.log(`${logSymbols.info} ${chalk.blue(message)}`);
};

export { divider, error, loading, message, success };
