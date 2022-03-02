import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { body, param, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

import logger from '../../lib/logger';
import userDao from '../../dao/users/userDao';
import { isAuthenticated } from '../../middleware/authMiddleware';

/**
 * @api {post} /user/v1/:id/validate Validate user by checking password
 * @apiDescription Validate an existing user by email.
 * @apiPermission Authentication
 * @apiVersion 1.0.0
 * @apiName ValidateUser
 * @apiGroup User
 *
 * @apiParam {String} id Users unique ID.
 *
 * @apiBody {String} password The password of the user.
 *
 * @apiSuccess {String} Success message.
 *
 */
export const userValidateController = [
  // Has to be an authenticated request
  isAuthenticated,
  // Sanitize and validate body params
  body('password', 'Please enter a password')
    .isLength({ min: 1, max: 30 })
    .escape(),
  // Validate param
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
    const user = await userDao.findUserById(req.params.id);
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
      const err = new Error('Incorrect password. Validation failed.');
      logger.error(err.message);
      res.status(401).send({ message: err.message });
      return;
    }

    res.status(200).json({ message: 'User validated.' });
    return;
  })
];
