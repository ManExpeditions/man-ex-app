import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { body, param, query, validationResult } from 'express-validator';
import TwilioServices from '../../lib/twilio';
import logger from '../../lib/logger';
import userDao from '../../dao/users/userDao';
import { isAuthenticated } from '../../middleware/authMiddleware';

/**
 * @api {post} /user/v1/:id/verify/code Send verification code
 * @apiDescription Receive a verification email or sms to verify a user's email or phone number
 * @apiPermission Authentication
 * @apiVersion 1.0.0
 * @apiName VerificationCode
 * @apiGroup User
 *
 * @apiParam {String} id Users unique ID.
 *
 * @apiQuery {String} type Either email or phone.
 *
 * @apiBody {String} Phone The mobile phone to send verification code (only required if type = phone)
 * @apiBody {String} Email The email to send verification code (only required if type = email)
 *
 * @apiSuccess {Object} User.
 *
 * @apiError UserDoesNotExist Cannot signin user that does not exist.
 * @apiError InvalidVerificationCode Cannot verify incorrect code.
 */
export const userVerificationCodeController = [
  // Requires user to be authenticated
  isAuthenticated,

  // Validate params
  param('id', 'Id param must be a string').isString().escape(),

  // Validate query params
  query(
    'type',
    'Invalid value for query param type: type must be either phone or email'
  )
    .isString()
    .isIn(['email', 'phone'])
    .escape(),

  // Sanitize and validate body params
  body('phone', 'Enter valid phone')
    .optional()
    .isMobilePhone('any', { strictMode: true })
    .escape(),
  body('email', 'Enter valid email').optional().isEmail().escape(),

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

    const type = req.query.type === 'email' ? 'email' : 'phone';

    // If type is email, and email already verified, avoid
    // sending verification code.

    // Ensure that email exists if sending verification
    // code to email.
    const email = req.body.email;
    if (type === 'email' && !email) {
      const err = new Error('Invalid Request: Enter a valid email in body.');
      logger.error(err.message);
      res.status(400).json({ message: err.message });
      return;
    } else if (type === 'email' && email === user.email && user.emailVerified) {
      const err = new Error('Invalid Request: Email already verified.');
      logger.error(err.message);
      res.status(400).json({ message: err.message });
      return;
    }

    // We need to make sure that the email is not being used by another user
    if (type === 'email') {
      const existingEmailUser = await userDao.findUserByEmail(email);
      if (
        existingEmailUser &&
        existingEmailUser.email === user.email &&
        user.emailVerified
      ) {
        const err = new Error('Invalid Request: Email already being used.');
        logger.error(err.message);
        res.status(400).json({ message: err.message });
        return;
      }
    }

    // Ensure that phone exists if sending verification
    // code to phone.
    const phone = req.body.phone;
    if (type === 'phone' && !phone) {
      const err = new Error(
        'Invalid Request: Enter a valid phone number in body.'
      );
      logger.error(err.message);
      res.status(400).json({ message: err.message });
      return;
    }

    const address = type === 'email' ? email : phone;

    // Send verification code to phone or email accordingly
    await TwilioServices.sendVerificationCode(
      address,
      type === 'email' ? 'email' : 'sms'
    )
      .then(() => {
        res
          .status(200)
          .send({ message: 'Sent verification code succesfully.' });
        return;
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: 'Failed: Verification code not sent.' });
        logger.error(err);
        return;
      });
  })
];
