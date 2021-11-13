import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

import logger from '../../../lib/logger';
import User from '../../../models/user';

export const emailRegistrationController = [
  // Sanitize and validate body params
  body('email', 'Please enter a valid email').trim().isEmail().escape(),
  body('password', 'Please enter a strong password')
    .isStrongPassword()
    .escape(),

  expressAsyncHandler(async function (req: Request, res: Response) {
    // Find the validation errors from the request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(errors);
      res.status(404).json(errors);
      return;
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      const err = new Error('User already exists. Please login.');
      res.status(404);
      logger.error(err);
      res.status(404).json(err);
      return;
    }

    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create new user
    const user = new User({
      email: req.body.email,
      password: encryptedPassword
    });

    const createdUser = await user.save();
    logger.info('Created user');

    res.status(200).json({
      email: createdUser.email
    });
    return;
  })
];
