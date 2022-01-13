import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuthenticated } from '../../middleware/authMiddleware';
import { uploader } from '../../lib/cloudinary';
import { assetsCloud } from '../../middleware/cloudinaryMiddleware';
import { upload, dataUri } from '../../lib/multer';
import logger from '../../lib/logger';
import { query, validationResult } from 'express-validator';

/**
 * @api {post} /assets/v1/photo Uploads a single photo
 * @apiDescription Uploads a single photo to cloudinary
 * @apiPermission Authentication
 * @apiVersion 1.0.0
 * @apiName Upload Photo
 * @apiGroup Assets
 *
 * @apiQuery {String} type Can only be profile.
 *
 * @apiBody {File} The image to upload.
 *
 * @apiSuccess {Object} Image.
 */
export const singlePhotoController = [
  // Requires user to be authenticated
  isAuthenticated,
  upload,
  assetsCloud,

  // Validate query params
  query('type', 'Invalid value for query param type: type must be profile')
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

    if (req.file) {
      try {
        // Encode file to a data URI
        const file = dataUri(req.file).content;

        const image = await uploader.upload(file as string, {
          overwrite: false,
          unique_filename: false,
          folder: req.query.type === 'profile' ? 'users/profiles' : ''
        });
        res.send({ url: image.secure_url });
        return;
      } catch (err) {
        logger.error(err);
        res.status(500).send({ message: err });
        return;
      }
    }
    res.status(400).send({ message: 'Request missing file.' });
  })
];
