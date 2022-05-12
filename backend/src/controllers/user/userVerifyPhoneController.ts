import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { body, param, validationResult } from 'express-validator';
import TwilioServices from '../../lib/twilio';
import logger from '../../lib/logger';
import userDao from '../../dao/users/userDao';
import { isAuthenticated } from '../../middleware/authMiddleware';

/**
 * @api {post} /user/v1/:id/verify/phone Verify phone
 * @apiDescription Verify a user's phone.
 * @apiPermission Authentication
 * @apiVersion 1.0.0
 * @apiName VerifyPhone
 * @apiGroup User
 *
 * @apiParam {String} id Users unique ID.
 *
 * @apiBody {String} phone The mobile phone to verify.
 * @apiBody {String} verification_code The verification code sent to the user.
 *
 * @apiSuccess {Object} User.
 *
 * @apiError UserDoesNotExist Cannot signin user that does not exist.
 * @apiError InvalidVerificationCode Cannot verify incorrect code.
 */
export const userVerifyPhoneController = [
  // Requires authentication
  isAuthenticated,

  // Validate param
  param('id', 'Id param must be a string')
    .isLength({ min: 5 })
    .isString()
    .escape(),
  // Sanitize and validate body params
  body('verification_code', 'Please enter a valid verification code')
    .isNumeric()
    .escape(),
  body('phone', 'Enter valid phone')
    .isMobilePhone('any', { strictMode: true })
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
    const userId = req.params.id;
    const user = await userDao.findUserById(userId);
    if (!user) {
      const err = new Error(
        `User not found: User with id ${req.params.id} not found.`
      );
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    // If phone is already verified, no need to verify again
    const phone = req.body.phone;
    if (user.phone === phone && user.phoneVerified) {
      const err = new Error(`User verified: User phone is already verified.`);
      logger.error(err.message);
      res.status(400).json({ message: err.message });
      return;
    }

    // Verify phone
    await TwilioServices.verifyService(phone, req.body.verification_code)
      .then(async (verification_check) => {
        if (verification_check.status === 'approved') {
          await userDao.verifyAndUpdatePhone(user, req.body.phone);
          const updatedUser = await userDao.findUserByIdAndPopulate(userId);
          res.send({
            id: updatedUser?._id,
            isActive: updatedUser?.isActive,
            firstName: updatedUser?.firstName,
            lastName: updatedUser?.lastName,
            email: updatedUser?.email,
            phone: updatedUser?.phone,
            emailVerified: updatedUser?.emailVerified,
            phoneVerified: updatedUser?.phoneVerified,
            gender: updatedUser?.gender,
            language: updatedUser?.language,
            interests: updatedUser?.interests,
            continents: updatedUser?.continents,
            city: updatedUser?.city,
            state: updatedUser?.state,
            country: updatedUser?.country,
            profilepic: updatedUser?.profilepic,
            profilepicVerified: updatedUser?.profilepicVerified,
            bio: updatedUser?.bio,
            verificationProfilepic: updatedUser?.verificationProfilepic,
            socials: updatedUser?.socials,
            authType: updatedUser?.authType,
            completedOnboarding: updatedUser?.completedOnboarding,
            favorites: updatedUser?.favorites,
            adminUser: updatedUser?.adminUser,
            isFeaturedMember: updatedUser?.isFeaturedMember
          });
          return;
        } else {
          res.status(400).send({
            message: 'Verification failed: Incorrect verification code.'
          });
          return;
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Verification failed: Incorrect verification code.'
        });
        logger.error(err);
        return;
      });
  })
];
