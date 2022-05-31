import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';

import logger from '../../lib/logger';
import userDao from '../../dao/users/userDao';
import { isAuthenticated } from '../../middleware/authMiddleware';

/**
 * @api {get} /user/v1/featuredmembers Get Featured Members
 * @apiDescription Get Featured Members
 * @apiPermission Authentication
 * @apiVersion 1.0.0
 * @apiName GetFeaturedMembers
 * @apiGroup User
 *
 */
export const usersGetFeaturedMembersController = [
  // Has to be an authenticated request
  isAuthenticated,

  expressAsyncHandler(async function (req: Request, res: Response) {
    // Find the validation errors from the request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(errors);
      res.status(404).json(errors);
      return;
    }

    // Check if user does not exist
    const users = await userDao.getFeaturedMembers();

    res.status(200).json(users || []);
    return;
  })
];
