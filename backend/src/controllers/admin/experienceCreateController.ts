import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import ExperienceDao from '../../dao/experiences/experienceDao';
import { isAdmin } from '../../middleware/adminMiddleware';
import { isAuthenticated } from '../../middleware/authMiddleware';

/**
 * @api {post} /experience/v1 Create new experience
 * @apiDescription Create a new experience
 * @apiPermission Authentication Admin
 * @apiVersion 1.0.0
 * @apiName CreateExperience
 * @apiGroup Admin
 */
export const experienceCreateController = [
  isAuthenticated,
  isAdmin,
  expressAsyncHandler(async function (req: Request, res: Response) {
    // Create new experience
    const createdExperience = await ExperienceDao.createNewExperience();

    res.status(200).json({
      id: createdExperience._id,
      isActive: createdExperience.isActive,
      name: createdExperience.name,
      description: createdExperience.description,
      numberOfDays: createdExperience.numberOfDays,
      location: createdExperience.location,
      continent: createdExperience.continent,
      season: createdExperience.season,
      pricing: createdExperience.pricing,
      deposit: createdExperience.deposit
    });
    return;
  })
];
