import { NextFunction, Response } from 'express';
import { AuthRequest } from '../types/general';

export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.user && req.user.adminUser) {
    next();
  } else {
    res.status(401).send({ message: "Forbidden: You don't have permission" });
  }
};
