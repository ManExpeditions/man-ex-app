import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import logger from '../../lib/logger';
import { isAuthenticated } from '../../middleware/authMiddleware';
import Axios from 'axios';
import config from '../../env';

/**
 * @api {post} /services/v1/location Gets places
 * @apiDescription Interface for interacting with the google places API.
 * @apiPermission Authentication
 * @apiVersion 1.0.0
 * @apiName GooglePlacess
 * @apiGroup Services
 *
 * @apiBody {String} Location The location to autocomplete
 *
 * @apiSuccess {Object} User.
 */
export const googlePlacesController = [
  // Requires user to be authenticated
  isAuthenticated,
  body('location', 'Enter location')
    .isAlpha('en-US', { ignore: ' ' })
    .isLength({ min: 1 })
    .escape(),
  expressAsyncHandler(async function (req: Request, res: Response) {
    // Find the validation errors from the request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(errors);
      res.status(404).json(errors);
      return;
    }
    const { data } = await Axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.body.location}&types=(cities)&key=${config.google_places}`
    );

    const preds = data['predictions'].map(
      (place: { description: unknown }) => place.description
    );

    res.send(preds);
  })
];
