import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { param, validationResult } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import experienceDao from '../../dao/experiences/experienceDao';
import GroupDao from '../../dao/groups/groupDao';
import logger from '../../lib/logger';
import { isAdmin } from '../../middleware/adminMiddleware';
import { isAuthenticated } from '../../middleware/authMiddleware';

/**
 * @api {post} /admin/v1/group/:id Create new group
 * @apiDescription Create a new group
 * @apiPermission Authentication Admin
 * @apiVersion 1.0.0
 * @apiName CreateGroup
 * @apiGroup Admin
 */
export const groupCreateController = [
  isAuthenticated,
  isAdmin,
  param('id', 'Enter a valid experience Id').isString().escape(),
  expressAsyncHandler(async function (req: Request, res: Response) {
    // Find the validation errors from the request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(errors);
      res.status(404).json(errors);
      return;
    }

    const experienceId = req.params.id as string;
    // Validate the id param
    if (!isValidObjectId(experienceId)) {
      const err = new Error('Experience id is not valid');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }
    // Check if experience does not exist
    const experience = await experienceDao.findExperienceById(req.params.id);
    if (!experience) {
      const err = new Error('Experience does not exist.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    // Create new group
    const createdGroup = await GroupDao.createNewGroup(experienceId);

    // Save group in experience
    await experienceDao.addGroupToExperience(experience, createdGroup._id);

    res.status(200).json({
      id: createdGroup._id,
      experience: createdGroup.experience,
      isActive: createdGroup.isActive,
      startDate: createdGroup.startDate,
      endDate: createdGroup.endDate,
      registrationEndDate: createdGroup.registrationEndDate,
      dateText: createdGroup.dateText,
      price: createdGroup.price,
      thriveCartScriptId: createdGroup.thriveCartScriptId,
      capacity: createdGroup.capacity,
      description: createdGroup.description
    });
    return;
  })
];
