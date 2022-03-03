import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import GroupDao from '../../dao/groups/groupDao';
import { isAdmin } from '../../middleware/adminMiddleware';
import { isAuthenticated } from '../../middleware/authMiddleware';

/**
 * @api {post} /admin/v1/group Create new group
 * @apiDescription Create a new group
 * @apiPermission Authentication Admin
 * @apiVersion 1.0.0
 * @apiName CreateGroup
 * @apiGroup Admin
 */
export const groupCreateController = [
  isAuthenticated,
  isAdmin,
  expressAsyncHandler(async function (req: Request, res: Response) {
    // Create new group
    const createdGroup = await GroupDao.createNewGroup();

    res.status(200).json({
      id: createdGroup._id,
      isActive: createdGroup.isActive,
      name: createdGroup.name,
      startDate: createdGroup.startDate,
      endDate: createdGroup.endDate,
      registrationEndDate: createdGroup.registrationEndDate,
      dateText: createdGroup.dateText,
      price: createdGroup.price,
      thriveCartScriptId: createdGroup.thriveCartScriptId,
      capacity: createdGroup.capacity,
      description: createdGroup.description
    });
    return;
  })
];
