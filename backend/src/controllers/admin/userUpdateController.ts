import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { body, param, validationResult } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import userDao from '../../dao/users/userDao';
import UserDao from '../../dao/users/userDao';
import logger from '../../lib/logger';
import { isAdmin } from '../../middleware/adminMiddleware';
import { isAuthenticated } from '../../middleware/authMiddleware';
import User from '../../models/user';

/**
 * @api {put} /admin/v1/user/:id/ Update User
 * @apiDescription Update a user to be featured or not
 * @apiPermission Authentication Admin
 * @apiVersion 1.0.0
 * @apiName Update User
 * @apiGroup Admin
 */
export const userUpdateController = [
  isAuthenticated,
  isAdmin,
  // Validate param id is a string
  param('id', 'Id param must be string').isString().escape(),

  // Validate query params
  body('isFeaturedMember', 'Enter valid isFeaturedMember value').isBoolean(),
  expressAsyncHandler(async function (req: Request, res: Response) {
    // Find the validation errors from the request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(errors);
      res.status(404).json(errors);
      return;
    }

    // Validate the id param
    const userId = req.params.id;
    if (!isValidObjectId(userId)) {
      const err = new Error('User id is not valid');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }
    // Check if user does not exist
    const user = await UserDao.findUserById(userId);
    if (!user) {
      const err = new Error('User does not exist.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    const updatedUser = await userDao.updateUser(userId, {
      isFeaturedMember: req.body.isFeaturedMember
    } as User);
    if (!updatedUser) {
      const err = new Error('Unable to update user.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    res.status(200).json(updatedUser);
    return;
  })
];
