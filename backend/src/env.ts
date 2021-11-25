import dotenv from 'dotenv';
dotenv.config();

const config = {
  mongo:
    process.env.NODE_ENV == 'production'
      ? (process.env.MONGO_URI as string)
      : 'mongodb://localhost:27017/manex',
  jwt_secret:
    process.env.NODE_ENV == 'production'
      ? (process.env.JWT_SECRET as string)
      : 'secret',
  twilio: {
    authToken: process.env.TWILIO_AUTH_TOKEN as string,
    accoundSid: process.env.TWILIO_ACCOUNT_SID as string,
    verifySid: process.env.TWILIO_VERIFY_SERVICE_SID as string
  }
};

export default config;