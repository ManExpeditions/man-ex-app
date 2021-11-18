import dotenv from 'dotenv';
dotenv.config();

const config = {
  mongo:
    process.env.NODE_ENV == 'production'
      ? (process.env.MONGO_URI as string)
      : 'mongodb://localhost:27017/manex'
};

export default config;
