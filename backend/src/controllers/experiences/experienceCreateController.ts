import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import ExperienceDao from '../../dao/experiences/experienceDao';

/**
 * @api {post} /experience/v1 Create new experience
 * @apiDescription Create a new experience
 * @apiPermission Authentication Admin
 * @apiVersion 1.0.0
 * @apiName CreateExperience
 * @apiGroup Experience
 */
export const experienceCreateController = [
  expressAsyncHandler(async function (req: Request, res: Response) {
    // Create new experience
    const createdExperience = await ExperienceDao.create_new_experience();

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
