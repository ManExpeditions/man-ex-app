import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import ExperienceDao from '../../dao/experiences/experienceDao';

/**
 * @api {get} /experience/v1 Get experiences
 * @apiDescription Get all experiences
 * @apiPermission None
 * @apiVersion 1.0.0
 * @apiName GetExperiences
 * @apiGroup Experience
 */
export const experiencesGetController = [
  expressAsyncHandler(async function (req: Request, res: Response) {
    // Find all experiences
    const experiences = await ExperienceDao.getExperiences();

    res.status(200).json(experiences);
    return;
  })
];
