import mongoose, { ConnectOptions } from 'mongoose';
import logger from './logger';

// MongoDB connection string.
let uri: string;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

const connect = async (dbURI: string): Promise<void> => {
  // Create database connection.
  uri = dbURI;
  try {
    await mongoose.connect(dbURI, options as ConnectOptions);
  } catch (err) {
    logger.error(`Mongoose connection failed at ${dbURI}: ${err}`);
  }
};

// MongoDB Connection Events.

// When successfully connected.
mongoose.connection.on('connected', () => {
  logger.info(`Mongoose connection open at ${uri}`);
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
