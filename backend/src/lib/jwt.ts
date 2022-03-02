import jwt from 'jsonwebtoken';
import config from '../env';
import mongoose from 'mongoose';

// Generates a JTW token based on user info and secret
const generateToken = (
  user: { id: mongoose.Types.ObjectId; adminUser?: boolean },
  expiresIn = '30d'
): string => {
  const token = jwt.sign(user, config.jwt_secret, {
    expiresIn
  });
  return token;
};

export default generateToken;
