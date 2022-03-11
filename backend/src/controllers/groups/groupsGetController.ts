import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { query, validationResult } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import experienceDao from '../../dao/experiences/experienceDao';
import GroupDao from '../../dao/groups/groupDao';
import logger from '../../lib/logger';

/**
 * @api {get} /group/v1 Get groups
 * @apiDescription Get all groups
 * @apiPermission None
 * @apiVersion 1.0.0
 * @apiName GetGroups
 * @apiGroup Group
 *
 * @apiQuery {String} (optional) id The Experience ID.
 */
export const groupsGetController = [
  // Validate id param
  query('experienceId', 'Experience Id must be a string')
    .optional()
    .isLength({ min: 5 })
    .isString()
    .escape(),
  expressAsyncHandler(async function (req: Request, res: Response) {
    // Find the validation errors from the request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(errors);
      res.status(404).json(errors);
      return;
    }

    // If experienceId exists
    const experienceId = (req.query.experienceId as string) || null;
    if (experienceId) {
      // Validate the id param
      if (!isValidObjectId(req.query.experienceId)) {
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
    }

    // Find all groups
    const groups = await GroupDao.getGroups(experienceId as string);

    res.status(200).json(groups);
    return;
  })
];
