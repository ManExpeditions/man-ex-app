import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { param, validationResult } from 'express-validator';

import logger from '../../lib/logger';
import userDao from '../../dao/users/userDao';
import { isAuthenticated } from '../../middleware/authMiddleware';

/**
 * @api {post} /user/v1/:id Delete user
 * @apiDescription Delete an existing user.
 * @apiPermission Authentication
 * @apiVersion 1.0.0
 * @apiName DeleteUser
 * @apiGroup User
 *
 * @apiParam {String} id Users unique ID.
 *
 * @apiSuccess {String} Success message.
 *
 */
export const userDeleteController = [
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

    // Check if user does not exist
    const user = await userDao.find_user_by_id(req.params.id);
    if (!user) {
      const err = new Error('User does not exist.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    const deletedUser = await userDao.delete_user_by_id(req.params.id);
    if (!deletedUser) {
      const err = new Error('Unable to delete user.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    res.status(200).json({ message: 'User deleted.' });
    return;
  })
];
