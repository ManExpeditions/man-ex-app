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
    const user = await userDao.findUserByEmail(req.body.email);
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
    user.isActive = true;
    const updatedUser = await userDao.updateUser(userId, user);
    if (!updatedUser) {
      const err = new Error('Unable to update user.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    // Generate authentication token
    const token = generateToken({
      id: updatedUser._id,
      adminUser: updatedUser.adminUser
    });

    const updatedUserPopulated = await userDao.findUserByIdAndPopulate(userId);

    res.status(200).json({
      id: updatedUserPopulated?._id,
      token: token,
      isActive: updatedUserPopulated?.isActive,
      firstName: updatedUserPopulated?.firstName,
      lastName: updatedUserPopulated?.lastName,
      email: updatedUserPopulated?.email,
      phone: updatedUserPopulated?.phone,
      emailVerified: updatedUserPopulated?.emailVerified,
      phoneVerified: updatedUserPopulated?.phoneVerified,
      gender: updatedUserPopulated?.gender,
      language: updatedUserPopulated?.language,
      interests: updatedUserPopulated?.interests,
      continents: updatedUserPopulated?.continents,
      city: updatedUserPopulated?.city,
      state: updatedUserPopulated?.state,
      country: updatedUserPopulated?.country,
      profilepic: updatedUserPopulated?.profilepic,
      profilepicVerified: updatedUserPopulated?.profilepicVerified,
      verificationProfilepic: updatedUserPopulated?.verificationProfilepic,
      bio: updatedUserPopulated?.bio,
      socials: updatedUserPopulated?.socials,
      authType: updatedUserPopulated?.authType,
      completedOnboarding: updatedUserPopulated?.completedOnboarding,
      favorites: updatedUserPopulated?.favorites,
      adminUser: updatedUserPopulated?.adminUser
    });
    return;
  })
];
