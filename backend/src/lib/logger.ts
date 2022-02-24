import { createLogger, transports } from 'winston';
import moment from 'moment';
import config from '../env';

// Define the custom settings for each transport.
const options = {
  console: {
    level: 'info',
    handleExceptions: true,
    json: true,
    colorize: true,
    timestamp() {
      return moment.utc().format();
    },
    prettyPrint: true,
    humanReadableUnhandledException: true
  }
};
const logger = createLogger({
  silent: config.node_env === 'test' ? true : false,
  transports: [
    // - Write all logs info (and below) to console.
    new transports.Console(options.console)
  ],
  exitOnError: false // Do not exit on handled exceptions.
});

// Create a stream object with a 'write' function that will be used by `morgan`.
export class LoggerStream {
  write(message: string) {
    logger.info(message);
  }
}

export default logger;
