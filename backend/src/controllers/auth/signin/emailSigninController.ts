import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

import logger from '../../../lib/logger';
import userDao from '../../../dao/users/userDao';
import generateToken from '../../../lib/jwt';

/**
 * @api {post} /auth/v1/signin/email Signin user by email
 * @apiDescription Signin an existing user by email.
 * @apiPermission none
 * @apiVersion 1.0.0
 * @apiName EmailSignin
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
 * @apiError UserDoesNotExist Cannot signin user that does not exist.
 */
export const emailSigninController = [
  // Sanitize and validate body params
  body('email', 'Please enter a valid email').trim().isEmail().escape(),
  body('password', 'Please enter a password')
    .isLength({ min: 1, max: 30 })
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
    const user = await userDao.find_user_by_email(req.body.email);
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

    // Make sure user isActive if signing in
    const userId = user._id;
    const updatedUser = await userDao.update_user(userId, {
      ...user,
      isActive: true
    });
    if (!updatedUser) {
      const err = new Error('Unable to update user.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    // Generate authentication token
    const token = generateToken(updatedUser);

    res.status(200).json({
      id: updatedUser._id,
      token: token,
      isActive: updatedUser.isActive,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      emailVerified: updatedUser.emailVerified,
      phoneVerified: updatedUser.phoneVerified,
      gender: updatedUser.gender,
      language: updatedUser.language,
      interests: updatedUser.interests,
      continents: updatedUser.continents,
      city: updatedUser.city,
      state: updatedUser.state,
      country: updatedUser.country,
      profilepic: updatedUser.profilepic,
      profilepicVerified: updatedUser.profilepicVerified,
      verificationProfilepic: updatedUser.verificationProfilepic,
      bio: updatedUser.bio,
      socials: updatedUser.socials,
      authType: updatedUser.authType,
      completedOnboarding: updatedUser.completedOnboarding
    });
    return;
  })
];
