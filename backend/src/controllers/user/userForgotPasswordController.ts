import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import SendGridServices from '../../lib/sendgrid';
import logger from '../../lib/logger';
import userDao from '../../dao/users/userDao';
import generateToken from '../../lib/jwt';

/**
 * @api {post} /user/v1/forgotpassword Forgot Password User
 * @apiDescription Send email with password reset link
 * @apiVersion 1.0.0
 * @apiName ForgotPasswordUser
 * @apiGroup User
 *
 * @apiSuccess {String} Success message.
 *
 */
export const userForgotPasswordController = [
  // Validate body params
  body('email', 'Please enter a valid email').isEmail().escape(),

  expressAsyncHandler(async function (req: Request, res: Response) {
    // Find the validation errors from the request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(errors);
      res.status(404).json(errors);
      return;
    }

    // Check if user does not exist with email
    const userEmail = req.body.email;
    const user = await userDao.findUserByEmail(userEmail);
    if (!user) {
      const err = new Error('No user associated with email.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    // Generate authentication token
    const userToken = generateToken({
      id: user._id,
      adminUser: user.adminUser
    });

    // Send the password reset link
    await SendGridServices.forgotPasswordService(userEmail, userToken).catch(
      (err) => {
        res
          .status(500)
          .json({ message: 'Failed: Password reset link not sent.' });
        logger.error(err);
        return;
      }
    );

    res.status(200).json({
      message:
        'A password reset link was sent. Click the link in the email to create a new password.'
    });
    return;
  })
];
