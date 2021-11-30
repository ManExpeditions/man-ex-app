import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../env';
import { AuthRequest } from '../types/general';

export const isAuthenticated = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authorization = req.headers.authorization;
  if (authorization) {
    // Bearer token from request
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, String(config.jwt_secret), (err, decoded) => {
      if (err) {
        const err = new Error('Authorization failed: Invalid user token');
        res.status(401).send({ message: err.message });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    const err = new Error(
      'Invalid Request: Request missing Authorization header'
    );
    res.status(401).send({ message: err.message });
  }
};
