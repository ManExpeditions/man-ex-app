import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { body, param, query, validationResult } from 'express-validator';
import TwilioServices from '../../lib/twilio';
import logger from '../../lib/logger';
import userDao from '../../dao/users/userDao';

/**
 * @api {post} /user/v1/:id/verify Verify user
 * @apiDescription Verify a user's email or phone number
 * @apiPermission none
 * @apiVersion 1.0.0
 * @apiName VerifyUser
 * @apiGroup User
 *
 * @apiParam {String} id Users unique ID.
 *
 * @apiQuery {String} type Either email or phone.
 *
 * @apiBody {String} verification_code The verification code sent to the user.
 *
 * @apiSuccess {Object} User.
 *
 * @apiError UserDoesNotExist Cannot signin user that does not exist.
 * @apiError InvalidVerificationCode Cannot verify incorrect code.
 */
export const userVerificationController = [
  param('id', 'Id param must be a string').isString().escape(),
  query(
    'type',
    'Invalid value for query param type: type must be either phone or email'
  )
    .isString()
    .isIn(['email', 'phone'])
    .escape(),
  // Sanitize and validate body params
  body('verification_code', 'Please enter a valid verification code')
    .isNumeric()
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

    const user = await userDao.find_user_by_id(userId);
    if (!user) {
      const err = new Error(
        `User not found: User with id ${req.params.id} not found.`
      );
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    const type = req.query.type === 'email' ? 'email' : 'phone';

    // If user is already verified, no need to verify again
    if (type === 'email' && user.emailVerified) {
      const err = new Error(`User verified: User email is already verified.`);
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    } else if (type === 'phone' && user.phoneVerified) {
      const err = new Error(`User verified: User phone is already verified.`);
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    // Since mobile phone is not a required field, we have to handle case
    // where client attempts to verify a number that does not exist
    if (type === 'phone' && !user.phone) {
      const err = new Error(
        `Verification failed: User does not have a mobile number.`
      );
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    const address = type === 'email' ? user.email : user.phone;

    // Verify email or phone accordingly
    await TwilioServices.verifyEmail(address, req.body.verification_code)
      .then(async (verification_check) => {
        if (verification_check.status === 'approved') {
          const updatedUser = await userDao.verify_user(user, type);
          res.send({
            id: updatedUser?._id,
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
            verificationProfilepic: updatedUser?.verificationProfilepic,
            socials: updatedUser?.socials,
            authType: updatedUser?.authType,
            completedOnboarding: updatedUser?.completedOnboarding
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
