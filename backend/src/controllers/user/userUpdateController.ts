import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { body, param, validationResult } from 'express-validator';
import logger from '../../lib/logger';
import userDao from '../../dao/users/userDao';
import { isAuthenticated } from '../../middleware/authMiddleware';

/**
 * @api {put} /auth/v1/:id/ Update user
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
 * @apiBody {String} Bio The bio of user.
 * @apiBody {Object} socials The user's socials e.g. facebook, instagram etc.
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
  body('isActive', 'Enter valid isActive value')
    .optional()
    .isBoolean()
    .escape(),
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
    .isStrongPassword({ minSymbols: 0 })
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
  body('profilepicVerified', 'Enter valid value')
    .optional()
    .isBoolean()
    .escape(),
  body('verificationProfilePic', 'Enter valid value')
    .optional()
    .isString()
    .isLength({ min: 10 })
    .escape(),
  body('bio', 'Enter valid value for bio')
    .optional()
    .isString()
    .isLength({ min: 200, max: 300 }),
  body('socials', 'Enter valid socials. Socials should be an object.')
    .optional()
    .isObject(),
  body('socials.facebook', 'Enter valid facebook username.')
    .if(body('socials').exists())
    .isString(),
  body('socials.instagram', 'Enter valid instagram username.')
    .if(body('socials').exists())
    .isString(),
  body('socials.linkedin', 'Enter valid linkedin username.')
    .if(body('socials').exists())
    .isString(),

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
    const userId = req.params.id;
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

    const populatedUpdatedUser = await userDao.findUserByIdAndPopulate(userId);

    res.status(200).json({
      id: populatedUpdatedUser?._id,
      isActive: populatedUpdatedUser?.isActive,
      firstName: populatedUpdatedUser?.firstName,
      lastName: populatedUpdatedUser?.lastName,
      email: populatedUpdatedUser?.email,
      phone: populatedUpdatedUser?.phone,
      emailVerified: populatedUpdatedUser?.emailVerified,
      phoneVerified: populatedUpdatedUser?.phoneVerified,
      gender: populatedUpdatedUser?.gender,
      language: populatedUpdatedUser?.language,
      interests: populatedUpdatedUser?.interests,
      continents: populatedUpdatedUser?.continents,
      city: populatedUpdatedUser?.city,
      state: populatedUpdatedUser?.state,
      country: populatedUpdatedUser?.country,
      profilepic: populatedUpdatedUser?.profilepic,
      profilepicVerified: populatedUpdatedUser?.profilepicVerified,
      verificationProfilepic: populatedUpdatedUser?.verificationProfilepic,
      bio: populatedUpdatedUser?.bio,
      socials: populatedUpdatedUser?.socials,
      authType: populatedUpdatedUser?.authType,
      completedOnboarding: populatedUpdatedUser?.completedOnboarding,
      favorites: populatedUpdatedUser?.favorites,
      adminUser: populatedUpdatedUser?.adminUser
    });
    return;
  })
];
