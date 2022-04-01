import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { param, validationResult } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import GroupDao from '../../dao/groups/groupDao';
import logger from '../../lib/logger';

/**
 * @api {get} /group/v1/:id Get group
 * @apiDescription Get group with id
 * @apiPermission None
 * @apiVersion 1.0.0
 * @apiName GetGroup
 * @apiGroup Group
 */
export const groupGetController = [
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
      const err = new Error('Group id is not valid.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }
    // Check if group does not exist
    const group = await GroupDao.findGroupById(req.params.id);
    if (!group) {
      const err = new Error('Group does not exist.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    res.status(200).json(group);
    return;
  })
];
