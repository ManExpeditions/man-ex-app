import cloudinary from 'cloudinary';
import { NextFunction, Request, Response } from 'express';
import config from '../env';

// Middleware config for cloudinary
export const assetsCloud = (
  _req: Request,
  _res: Response,
  next: NextFunction
): void => {
  cloudinary.v2.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apikey,
    api_secret: config.cloudinary.secret
  });
  next();
};
