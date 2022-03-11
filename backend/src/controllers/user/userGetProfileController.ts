import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { param, validationResult } from 'express-validator';

import logger from '../../lib/logger';
import userDao from '../../dao/users/userDao';
import { isAuthenticated } from '../../middleware/authMiddleware';
import { isValidObjectId } from 'mongoose';

/**
 * @api {post} /user/v1/:id/profile Get user profile
 * @apiDescription Get profile of an existing user
 * @apiPermission Authentication
 * @apiVersion 1.0.0
 * @apiName GetUserProfile
 * @apiGroup User
 *
 * @apiParam {String} id Users unique ID.
 *
 */
export const userGetProfileController = [
  // Has to an authenticated request
  isAuthenticated,
  // Validate params
  param('id', 'Id param must be a string')
    .isLength({ min: 5 })
    .isString()
    .escape(),

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
    const user = await userDao.findUserById(userId);
    if (!user) {
      const err = new Error('User does not exist.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      profilepic: user.profilepic,
      bio: user.bio,
      country: user.country,
      interests: user.interests,
      socials: user.socials
    });
    return;
  })
];
