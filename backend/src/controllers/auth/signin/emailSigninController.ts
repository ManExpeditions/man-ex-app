import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

import logger from '../../../lib/logger';
import User from '../../../models/user';

export const emailSigninController = [
  // Sanitize and validate body params
  body('email', 'Please enter a valid email').trim().isEmail().escape(),
  body('password', 'Please enter a password').isLength({ min: 1 }).escape(),

  expressAsyncHandler(async function (req: Request, res: Response) {
    // Find the validation errors from the request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(errors);
      res.status(404).json(errors);
      return;
    }

    // Check if user does not exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const err = new Error('User does not exist. Please register.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    // Validate if passwords match
    const passwordsMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordsMatch) {
      const err = new Error('Incorrect password.');
      logger.error(err.message);
      res.status(401).send({ message: err.message });
      return;
    }

    res.status(200).json({
      id: user._id,
      email: user.email
    });
    return;
  })
];
