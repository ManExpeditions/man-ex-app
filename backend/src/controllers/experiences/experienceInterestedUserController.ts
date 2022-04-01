import { Request, Response } from 'express';
import mongoose from 'mongoose';
import expressAsyncHandler from 'express-async-handler';
import { body, param, validationResult } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import experienceDao from '../../dao/experiences/experienceDao';
import userDao from '../../dao/users/userDao';
import logger from '../../lib/logger';

/**
 * @api {put} /experience/v1/:id/interested Get experience
 * @apiDescription Add interested user to experience
 * @apiPermission Authentication
 * @apiVersion 1.0.0
 * @apiName InterestedUser
 * @apiExperience Experience
 */
export const experienceInterestedUserController = [
  // Validate param id is a string
  param('id', 'Id param must be string').isString(),
  body('userId', 'User must be valid').isString(),
  expressAsyncHandler(async function (req: Request, res: Response) {
    // Find the validation errors from the request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(errors);
      res.status(404).json(errors);
      return;
    }

    // Validate the id param
    const experienceId = req.params.id;
    if (!isValidObjectId(experienceId)) {
      const err = new Error('Experience id is not valid');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }
    // Check if experience does not exist
    const experience = await experienceDao.findExperienceById(experienceId);
    if (!experience) {
      const err = new Error('Experience does not exist.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    // Validate the user id
    const userId = req.body.userId;
    if (!isValidObjectId(userId)) {
      const err = new Error('User id is not valid.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }
    // Check if user does not exist
    const user = await userDao.findUserById(userId);
    if (!user) {
      const err = new Error('User does not exist.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    // Check if user already in interested users
    const userExists = experienceDao.userExistsInExperienceInterestedUsers(
      mongoose.Types.ObjectId(userId),
      experience
    );
    if (userExists) {
      const err = new Error('User already exists in interested users list.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    // Add user to interested users list
    const updatedExperience = await experienceDao.addInterestedUserToExperience(
      userId,
      experience
    );

    res.status(200).json(updatedExperience);
    return;
  })
];
