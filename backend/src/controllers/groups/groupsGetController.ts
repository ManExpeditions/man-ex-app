import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { param, validationResult } from 'express-validator';
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
 * @apiParam {String} experienceId Experience ID.
 */
export const groupsGetController = [
  // Validate id param
  param('experienceId', 'Id must be a string')
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

    // Find all groups
    const groups = await GroupDao.getGroups();

    res.status(200).json(groups);
    return;
  })
];
