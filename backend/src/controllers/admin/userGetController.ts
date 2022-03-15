import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { param, validationResult } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import UserDao from '../../dao/users/userDao';
import logger from '../../lib/logger';
import { isAdmin } from '../../middleware/adminMiddleware';
import { isAuthenticated } from '../../middleware/authMiddleware';

/**
 * @api {get} /admin/v1/user/:id Get user
 * @apiDescription Get user with id
 * @apiPermission Authentication Admin
 * @apiVersion 1.0.0
 * @apiName GetUser
 * @apiGroup Admin
 */
export const userGetController = [
  isAuthenticated,
  isAdmin,
  // Validate param id is a string
  param('id', 'Id param must be string').isString().escape(),
  expressAsyncHandler(async function (req: Request, res: Response) {
    // Find the validation errors from the request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(errors);
      res.status(404).json(errors);
      return;
    }

    // Validate the id param
    if (!isValidObjectId(req.params.id)) {
      const err = new Error('User id is not valid');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }
    // Check if user does not exist
    const user = await UserDao.findUserById(req.params.id);
    if (!user) {
      const err = new Error('User does not exist.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    res.status(200).json(user);
    return;
  })
];
