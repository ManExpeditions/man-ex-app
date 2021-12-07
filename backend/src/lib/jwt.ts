import jwt from 'jsonwebtoken';
import config from '../env';
import mongoose from 'mongoose';

// Generates a JTW token based on user info and secret
const generateToken = (
  user: { _id: mongoose.Types.ObjectId | string; email: string },
  expiresIn = '30d'
): string => {
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email
    },
    config.jwt_secret,
    {
      expiresIn
    }
  );
  return token;
};

export default generateToken;
