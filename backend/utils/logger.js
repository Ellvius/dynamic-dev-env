import chalk from 'chalk'; 

const logLevels = {
  INFO: 'INFO',
  ERROR: 'ERROR',
  WARN: 'WARN',
};

export const logger = {
  info: (message) => {
    console.log(chalk.green(`[${logLevels.INFO}] ${new Date().toISOString()} - ${message}`));
  },
  error: (message) => {
    console.error(chalk.red(`[${logLevels.ERROR}] ${new Date().toISOString()} - ${message}`));
  },
  warn: (message) => {
    console.warn(chalk.yellow(`[${logLevels.WARN}] ${new Date().toISOString()} - ${message}`));
  },
};
