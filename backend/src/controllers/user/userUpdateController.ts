import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { body, param, validationResult } from 'express-validator';
import logger from '../../lib/logger';
import userDao from '../../dao/users/userDao';
import { isAuthenticated } from '../../middleware/authMiddleware';

/**
 * @api {post} /auth/v1/signin/email Update user
 * @apiDescription Update user information
 * @apiPermission Authentication
 * @apiVersion 1.0.0
 * @apiName UpdateUser
 * @apiGroup User
 *
 * @apiParam {String} id Users unique ID.
 *
 * @apiBody {String} firstName The first name.
 * @apiBody {String} lastName The last name.
 * @apiBody {String} email The email.
 * @apiBody {String} phone The phone.
 * @apiBody {Boolean} emailVerified Whether email is verified.
 * @apiBody {Boolean} phoneVerified Whether phone is verified.
 * @apiBody {String} gender The gender.
 * @apiBody {String} language The language.
 * @apiBody {[String]} interests The user's interests.
 * @apiBody {[String]} continents The user's continents.
 * @apiBody {String} city The city.
 * @apiBody {String} state The state.
 * @apiBody {String} country The country.
 * @apiBody {String} profilepic The user's profilepic.
 * @apiBody {String} profilepicVerified Whether profilepic is verified.
 * @apiBody {String} verificationProfilepic The verification profile picture.
 * @apiBody {[String]} socials The user's socials e.g. facebook, instagram etc.
 * @apiBody {String} completedOnboarding Whether initial onboarding is completed.
 *
 * @apiError UserDoesNotExist Cannot update user that does not exist.
 * @apiError UpdateUserFailed UserUpdateFailed.
 */
export const userUpdateController = [
  // Requires authentication
  isAuthenticated,
  param('id', 'Id param must be string').isString().escape(),
  // Sanitize and validate body params
  body('firstName', 'Enter valid first name')
    .optional()
    .isAlphanumeric()
    .isLength({ min: 3 })
    .escape(),
  body('lastName', 'Enter valid last name')
    .optional()
    .isAlphanumeric()
    .isLength({ min: 1 })
    .escape(),
  body('email', 'Enter valid email').optional().isEmail().escape(),
  body('phone', 'Enter valid phone')
    .optional()
    .isMobilePhone('any', { strictMode: true })
    .escape(),
  body('password', 'Enter valid password')
    .optional()
    .isStrongPassword()
    .escape(),
  body('emailVerified', 'Enter valid emailVerified value')
    .optional()
    .isBoolean()
    .escape(),
  body('phoneVerified', 'Enter valid phoneVerified value')
    .optional()
    .isBoolean()
    .escape(),
  body('gender', 'Enter valid gender value')
    .optional()
    .isString()
    .isLength({ min: 3, max: 10 })
    .escape(),
  body('language', 'Enter valid language')
    .optional()
    .isString()
    .isLength({ min: 3, max: 10 })
    .escape(),
  body('interests', 'Enter valid interests').optional().isArray(),
  body('continents', 'Enter valid continents').optional().isArray(),
  body('city', 'Enter valid city').optional().isLength({ min: 2 }).escape(),
  body('state', 'Enter valid state')
    .optional()
    .isString()
    .isLength({ min: 2 })
    .escape(),
  body('country', 'Enter valid country')
    .optional()
    .isString()
    .isLength({ min: 2 })
    .escape(),
  body('profilepic', 'Enter valid profilepic')
    .optional()
    .isString()
    .isLength({ min: 10 })
    .escape(),
  body('profilepicVerified', 'Enter valid profilepicVerified')
    .optional()
    .isBoolean()
    .escape(),
  body('verificationProfilePic', 'Enter valid profilepicVerified')
    .optional()
    .isString()
    .isLength({ min: 10 })
    .escape(),
  body('socials', 'Enter valid profilepicVerified')
    .optional()
    .isArray()
    .isLength({ min: 1 })
    .escape(),

  expressAsyncHandler(async function (req: Request, res: Response) {
    // Find the validation errors from the request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(errors);
      res.status(404).json(errors);
      return;
    }

    // Handle case when empty body
    if (Object.keys(req.body).length === 0) {
      logger.error('Request body is empty');
      res.status(404).json({ message: 'Request body is empty.' });
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

    const updatedUser = await userDao.update_user(req.params.id, req.body);
    if (!updatedUser) {
      const err = new Error('Unable to update user.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    console.log(req.body.interests);

    res.status(200).json({
      id: updatedUser._id,
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
      socials: updatedUser.socials,
      authType: updatedUser.authType,
      completedOnboarding: updatedUser.completedOnboarding
    });
    return;
  })
];
