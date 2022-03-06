import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { param, validationResult } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import experienceDao from '../../dao/experiences/experienceDao';
import groupDao from '../../dao/groups/groupDao';
import logger from '../../lib/logger';
import { isAdmin } from '../../middleware/adminMiddleware';
import { isAuthenticated } from '../../middleware/authMiddleware';

/**
 * @api {post} /admin/v1/group/:experienceId/:groupId Delete a group
 * @apiDescription Delete a group
 * @apiPermission Authentication Admin
 * @apiVersion 1.0.0
 * @apiName DeleteGroup
 * @apiGroup Admin
 */
export const groupDeleteController = [
  // Sanitize and validate parms
  param('experienceId', 'Experience Id param must be string')
    .isString()
    .escape(),
  param('groupId', 'Group Id param must be string').isString().escape(),
  isAuthenticated,
  isAdmin,
  expressAsyncHandler(async function (req: Request, res: Response) {
    // Find the validation errors from the request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(errors);
      res.status(404).json(errors);
      return;
    }

    const experienceId = req.params.experienceId;
    const groupId = req.params.groupId;

    // Validate the experience id param
    if (!isValidObjectId(experienceId)) {
      const err = new Error('Experience id is not valid');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }
    // Validate the id param
    if (!isValidObjectId(groupId)) {
      const err = new Error('Group id is not valid');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    // Check if experience does not exist
    const experience = await experienceDao.findExperienceById(experienceId);
    if (!experience) {
      const err = new Error('Group does not exist.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }
    // Check if group does not exist
    const group = await groupDao.findGroupById(groupId);
    if (!group) {
      const err = new Error('Group does not exist.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    // Delete the group reference
    await experienceDao.deleteGroupFromExperience(experienceId, groupId);

    // Delete the group
    const deletedGroup = await groupDao.deleteGroupById(groupId);

    res.status(200).json(deletedGroup);
    return;
  })
];
