import { Request, Response } from 'express';
import { query, validationResult } from 'express-validator';
import expressAsyncHandler from 'express-async-handler';
import ExperienceDao from '../../dao/experiences/experienceDao';
import logger from '../../lib/logger';

/**
 * @api {get} /experience/v1 Get experiences
 * @apiDescription Get all experiences
 * @apiPermission None
 * @apiVersion 1.0.0
 * @apiName GetExperiences
 * @apiGroup Experience
 *
 * @apiQuery {Boolean} isActive Option to get active experiences
 * @apiQuery {Boolean} isFeatured Option to get featured experiences
 *
 */
export const experiencesGetController = [
  query('isActive', 'Enter valid value for isActive').optional().isBoolean(),
  query('isFeatured', 'Enter valid value for isFeatured')
    .optional()
    .isBoolean(),
  expressAsyncHandler(async function (req: Request, res: Response) {
    // Find the validation errors from the request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(errors);
      res.status(404).json(errors);
      return;
    }

    // Handle filters
    const isActiveFilter = req.query.isActive
      ? { isActive: req.query.isActive === 'true' ? true : false }
      : {};
    const isFeaturedFilter = req.query.isFeatured
      ? { isFeatured: req.query.isFeatured === 'true' ? true : false }
      : {};
    const continentFilter = req.query.continent
      ? {
          continent: decodeURIComponent(req.query.continent as string).split(
            ','
          )
        }
      : {};

    const filters = {
      ...isActiveFilter,
      ...isFeaturedFilter,
      ...continentFilter
    };

    // Find experiences
    const experiences = await ExperienceDao.getExperiences(filters);

    res.status(200).json(experiences);
    return;
  })
];
