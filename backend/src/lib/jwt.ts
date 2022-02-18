import jwt from 'jsonwebtoken';
import config from '../env';
import mongoose from 'mongoose';

// Generates a JTW token based on user info and secret
const generateToken = (
  user: { _id: mongoose.Types.ObjectId },
  expiresIn = '30d'
): string => {
  const token = jwt.sign(
    {
      _id: user._id
    },
    config.jwt_secret,
    {
      expiresIn
    }
  );
  return token;
};

export default generateToken;
