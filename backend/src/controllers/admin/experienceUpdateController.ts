import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { body, param, validationResult } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import logger from '../../lib/logger';
import experienceDao from '../../dao/experiences/experienceDao';
import { isAuthenticated } from '../../middleware/authMiddleware';
import { isAdmin } from '../../middleware/adminMiddleware';

/**
 * @api {put} /admin/v1/experience/:id Update experience
 * @apiDescription Update an existing experience
 * @apiPermission Authentication Admin
 * @apiVersion 1.0.0
 * @apiName UpdateExperience
 * @apiGroup Admin
 *
 * @apiParam {String} id Experience unique ID.
 *
 * @apiBody {String} isActive Is the experience active.
 * @apiBody {String} name The experience name.
 * @apiBody {String} description The description of the experience.
 * @apiBody {Number} numberOfDays The duration of the experience in numbers.
 * @apiBody {String} location The location where the experience will be.
 * @apiBody {String} continent The continent where the experience will be.
 * @apiBody {String} season The season in which the experience will be held.
 * @apiBody {Number} pricing The price of the experience.
 * @apiBody {Number} deposit The deposit of the experience.
 * @apiBody {String} videoThumbnailImage The thumbnail for the experience video.
 * @apiBody {String} video The video for the experience.
 * @apiBody {String} heroImage The main image for the experience.
 * @apiBody {[String]} images The images relating to the experience.
 * @apiBody {Object} itinerary The experience itinerary.
 * @apiBody {Object} accomodations The experience accomodatino info.
 * @apiBody {Object} activities The experience activities.
 * @apiBody {Object} whatsIncluded Additinal Included information.
 * @apiBody {String} terms The terms and conditions of the experience.
 *
 */
export const experienceUpdateController = [
  // Requires authentication
  isAuthenticated,
  // Needs to be admin
  isAdmin,
  // Sanitize and validate parms
  param('id', 'Id param must be string').isString().escape(),
  // Sanitize and validate body params
  body('isActive', 'Enter valid isActive value')
    .optional()
    .isBoolean()
    .escape(),
  body('isFeatured', 'Enter valid isFeatured value')
    .optional()
    .isBoolean()
    .escape(),
  body('name', 'Enter valid name')
    .optional()
    .isString()
    .isLength({ min: 3 })
    .escape(),
  body('description', 'Enter valid description').optional().isString(),
  body('numberOfDays', 'Enter valid number of days')
    .optional()
    .isNumeric()
    .escape(),
  body('location', 'Enter valid location').optional().isString().escape(),
  body('continent', 'Enter valid continent').optional().isString().escape(),
  body('season', 'Enter valid season').optional().isString().escape(),
  body('pricing', 'Enter valid price').optional().isNumeric().escape(),
  body('deposit', 'Enter valid deposit').optional().isNumeric().escape(),
  body('videoThumbnailImage', 'Enter valid thumnail image')
    .optional()
    .isString()
    .escape(),
  body('video', 'Enter valid video').optional().isString().escape(),
  body('heroImage', 'Enter valid hero image').optional().isString().escape(),
  body('images', 'Enter valid images').optional().isString().escape(),
  body('itinerary', 'Enter valid itinerary').optional().isString().escape(),
  body('accomodations', 'Enter valid accomodations')
    .optional()
    .isString()
    .escape(),
  body('activities', 'Enter valid activities').optional().isString().escape(),
  body('whatsIncluded', 'Enter valid whats included')
    .optional()
    .isObject()
    .escape(),
  body('terms', 'Enter valid terms').optional().isString().escape(),

  expressAsyncHandler(async function (req: Request, res: Response) {
    // Find the validation errors from the request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(errors);
      res.status(404).json(errors);
      return;
    }

    // Handle case when empty body
    if (Object.keys(req.body).length === 0) {
      logger.error('Request body is empty');
      res.status(404).json({ message: 'Request body is empty.' });
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
    const experience = await experienceDao.findExperienceById(req.params.id);
    if (!experience) {
      const err = new Error('Experience does not exist.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    const updatedExperience = await experienceDao.updateExperience(
      req.params.id,
      req.body
    );
    if (!updatedExperience) {
      const err = new Error('Unable to update experience.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    res.status(200).json({
      id: updatedExperience._id,
      isActive: updatedExperience.isActive,
      isFeatured: updatedExperience.isFeatured,
      name: updatedExperience.name,
      description: updatedExperience.description,
      numberOfDays: updatedExperience.numberOfDays,
      location: updatedExperience.location,
      continent: updatedExperience.continent,
      season: updatedExperience.season,
      pricing: updatedExperience.pricing,
      deposit: updatedExperience.deposit,
      videoThumbnailImage: updatedExperience.videoThumbnailImage,
      video: updatedExperience.video,
      heroImage: updatedExperience.heroImage,
      images: updatedExperience.images,
      itinerary: updatedExperience.itinerary,
      accomodations: updatedExperience.accomodations,
      activities: updatedExperience.activities,
      whatsIncluded: updatedExperience.whatsIncluded,
      terms: updatedExperience.terms
    });
    return;
  })
];
