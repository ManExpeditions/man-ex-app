import { Response } from 'express';
import { AuthRequest } from '../../types/general';
import expressAsyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import logger from '../../lib/logger';
import userDao from '../../dao/users/userDao';
import { isAuthenticated } from '../../middleware/authMiddleware';

/**
 * @api {post} /user/v1/resetpassword Reset Password User
 * @apiDescription Reset user password
 * @apiVersion 1.0.0
 * @apiName ResetPasswordUser
 * @apiGroup User
 *
 * @apiSuccess {String} Success message.
 *
 */
export const userPasswordResetController = [
  // Needs to be authenticated
  isAuthenticated,
  // Validate body params
  body('password', 'Please enter a valid password')
    .isStrongPassword({ minSymbols: 0 })
    .escape(),

  expressAsyncHandler(async function (req: AuthRequest, res: Response) {
    // Find the validation errors from the request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(errors);
      res.status(404).json(errors);
      return;
    }

    const userId = req.user?.id;
    // Check if user does not exist with email
    const user = await userDao.findUserById(userId);
    if (!user) {
      const err = new Error('User does not exist.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    const updatedUser = await userDao.updateUser(userId, req.body);
    if (!updatedUser) {
      const err = new Error('Unable to update user.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    res.status(200).json({
      message: 'Password succesfully updated.'
    });
    return;
  })
];
