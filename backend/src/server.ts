import logger from './lib/logger';
import App from './app';
import env from './env';
import mongoose from './lib/mongoose';

const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose(env.mongo);

const server = App;
server.listen(port);
logger.info(`Server started on port: ${port}`);

const gracefulStopServer = function () {
  // Wait 10 secs for existing connection(s) to close and then exit.
  setTimeout(() => {
    logger.info('Shutting down server');
    process.exit(0);
  }, 1000);
};

// Kill server on unhandled exceptions and rejections.

process.on('uncaughtException', (err) => {
  logger.error(`Uncaught exception: ${err}`);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  logger.error(`unhandledRejection: ${err}`);
  process.exit(1);
});

process.on('SIGINT', gracefulStopServer);
process.on('SIGTERM', gracefulStopServer);
