import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../env';

// Generates a JTW token based on user info and secret
const generateToken = (user: User, expiresIn = '30d'): string => {
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
