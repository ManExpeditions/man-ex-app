import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { param, validationResult } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import ExperienceDao from '../../dao/experiences/experienceDao';
import logger from '../../lib/logger';

/**
 * @api {get} /experience/v1/:id Get experience
 * @apiDescription Get experience with id
 * @apiPermission None
 * @apiVersion 1.0.0
 * @apiName GetExperience
 * @apiGroup Experience
 */
export const experienceGetController = [
  // Validate param id is a string
  param('id', 'Id param must be string').isString().escape(),
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
    const experience = await ExperienceDao.find_experience_by_id(req.params.id);
    if (!experience) {
      const err = new Error('Experience does not exist.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    res.status(200).json(experience);
    return;
  })
];
