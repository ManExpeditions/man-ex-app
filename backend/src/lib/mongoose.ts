import mongoose from 'mongoose';
import { devConfig } from '../config/environments/dev';
import logger from './logger';

const env = process.env.NODE_ENV || 'dev';

// MongoDB connection string.
let dbURI: string;

switch (env) {
  case 'production':
    dbURI = devConfig.mongo.uri as string;
    break;
  default:
    dbURI = devConfig.mongo.uri as string;
}

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

const connect = async (): Promise<void> => {
  // Create database connection.
  try {
    await mongoose.connect(dbURI as string, options);
  } catch (err) {
    logger.error(`Mongoose connection failed at ${dbURI}: ${err}`);
  }
};

// MongoDB Connection Events.

// When successfully connected.
mongoose.connection.on('connected', () => {
  logger.info(`Mongoose connection open at ${dbURI}`);
});

// If the connection throws an error.
mongoose.connection.on('error', (err) => {
  logger.error(`Mongoose connection error: ${err}`);
});

// When the connection is disconnected.
mongoose.connection.on('disconnected', () => {
  logger.error('Mongoose connection disconnected');
});

// If the Node process ends, close the Mongoose connection.
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.error('Mongoose connection disconnected through app termination');
    process.exit(0);
  });
});

export default connect;
