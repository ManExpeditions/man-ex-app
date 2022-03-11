import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { param, validationResult } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import experienceDao from '../../dao/experiences/experienceDao';
import logger from '../../lib/logger';
import { isAdmin } from '../../middleware/adminMiddleware';
import { isAuthenticated } from '../../middleware/authMiddleware';

/**
 * @api {post} /admin/v1/experience Delete an experience
 * @apiDescription Create a new experience
 * @apiPermission Authentication Admin
 * @apiVersion 1.0.0
 * @apiName DeleteExperience
 * @apiGroup Admin
 */
export const experienceDeleteController = [
  // Sanitize and validate parms
  param('id', 'Id param must be string').isString().escape(),
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

    // Validate the id param
    if (!isValidObjectId(req.params.id)) {
      const err = new Error('Experience id is not valid');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }
    // Check if experience does not exist
    const deletedExperience = await experienceDao.deleteExperienceById(
      req.params.id
    );
    if (!deletedExperience) {
      const err = new Error('Experience does not exist.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    res.status(200).json(deletedExperience);
    return;
  })
];
