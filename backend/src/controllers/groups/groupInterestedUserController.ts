import { Request, Response } from 'express';
import mongoose from 'mongoose';
import expressAsyncHandler from 'express-async-handler';
import { body, param, validationResult } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import groupDao from '../../dao/groups/groupDao';
import GroupDao from '../../dao/groups/groupDao';
import userDao from '../../dao/users/userDao';
import logger from '../../lib/logger';

/**
 * @api {put} /group/v1/:id/interested InterestedUserGroup
 * @apiDescription Add interested user to group
 * @apiPermission Authentication
 * @apiVersion 1.0.0
 * @apiName InterestedUser
 * @apiGroup Group
 */
export const groupInterestedUserController = [
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
    const groupId = req.params.id;
    if (!isValidObjectId(groupId)) {
      const err = new Error('Group id is not valid');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }
    // Check if group does not exist
    const group = await GroupDao.findGroupById(groupId);
    if (!group) {
      const err = new Error('Group does not exist.');
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
    const userExists = groupDao.userExistsInGroupInterestedUsers(
      new mongoose.Types.ObjectId(userId),
      group
    );
    if (userExists) {
      const err = new Error('User already exists in interested users list.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    // Add user to interested users list
    const updatedGroup = await groupDao.addInterestedUserToGroup(group, userId);

    res.status(200).json(updatedGroup);
    return;
  })
];
