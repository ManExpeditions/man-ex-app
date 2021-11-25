import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

import logger from '../../../lib/logger';
import UserDao from '../../../dao/users/userDao';

/**
 * @api {post} /auth/v1/register/email Register user by email
 * @apiDescription Register a new user by email
 * @apiPermission none
 * @apiVersion 1.0.0
 * @apiName EmailRegister
 * @apiGroup Auth
 *
 * @apiBody {String} email The email.
 * @apiBody {String} password The password.
 *
 * @apiSuccess {String} id Id of the created user.
 * @apiSuccess {String} email Email of the created user.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": "61964435fd8574d454e26bc3"
 *       "email": "john@example.com",
 *     }
 *
 * @apiError UserAlreadyExists Cannot register user that already exists.
 */
export const emailRegistrationController = [
  // Sanitize and validate body params
  body('email', 'Enter a valid email').trim().isEmail().escape(),
  body('password', 'Enter a strong password').isStrongPassword().escape(),

  expressAsyncHandler(async function (req: Request, res: Response) {
    // Find the validation errors from the request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(errors);
      res.status(404).json(errors);
      return;
    }

    // Check if user exists
    const existingUser = await UserDao.find_user_by_email(req.body.email);
    if (existingUser) {
      const err = new Error('User already exists. Please login.');
      res.status(404);
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create new user
    const createdUser = await UserDao.create_new_user_by_email(
      req.body.email,
      encryptedPassword
    );

    res.status(200).json({
      id: createdUser._id,
      email: createdUser.email
    });
    return;
  })
];
