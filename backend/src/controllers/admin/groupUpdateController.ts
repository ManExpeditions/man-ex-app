import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { body, param, validationResult } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import logger from '../../lib/logger';
import groupDao from '../../dao/groups/groupDao';
import { isAuthenticated } from '../../middleware/authMiddleware';
import { isAdmin } from '../../middleware/adminMiddleware';

/**
 * @api {put} /admin/v1/group/:id Update group
 * @apiDescription Update an existing group
 * @apiPermission Authentication Admin
 * @apiVersion 1.0.0
 * @apiName UpdateGroup
 * @apiGroup Admin
 *
 *
 * @apiParam {String} id Group unique ID.
 *
 * @apiBody {String} isActive Is the group active.
 * @apiBody {String} name The group name.
 * @apiBody {Date} startDate The starting date for the group.
 * @apiBody {Date} endDate The end date for the group.
 * @apiBody {Date} registrationEndDate The end date for the group.
 * @apiBody {String} dateText The date string to display on the goup.
 * @apiBody {Number} price The price of the group.
 * @apiBody {String} thriveCartScriptId The script id for the payment.
 * @apiBody {Number} capacity The capacity of the group.
 * @apiBody {String} description The description of the group.
 * @apiBody {String} groupLead The userId of the user leading the group.
 * @apiBody {[String]} goingUsers The userIds of the users going with this group.
 * @apiBody {[String]} interestedUsers The userIds of the users interested in this group.
 *
 */
export const groupUpdateController = [
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
  body('startDate', 'Enter valid startDate value').optional().isString(),
  body('endDate', 'Enter valid endDate value').optional().isString(),
  body('registrationEndDate', 'Enter valid registrationEndDate value')
    .optional()
    .isString(),
  body('dateText', 'Enter valid dateText value').optional().isString(),
  body('price', 'Enter valid price value').optional().isNumeric().escape(),
  body('thriveCartScriptId', 'Enter valid thriveCartScriptId value')
    .optional()
    .isString()
    .escape(),
  body('capacity', 'Enter valid capacity value')
    .optional()
    .isNumeric()
    .escape(),
  body('description', 'Enter valid description')
    .optional()
    .isString()
    .isLength({ min: 10 })
    .escape(),
  body('groupLead', 'Enter valid groupdLead').optional().isString().escape(),
  body('continent', 'Enter valid continent').optional().isString().escape(),
  body('goingUsers', 'Enter valid goingUsers').optional().isArray(),

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
      const err = new Error('Group id is not valid');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }
    // Check if group does not exist
    const group = await groupDao.findGroupById(req.params.id);
    if (!group) {
      const err = new Error('Group does not exist.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    const updatedGroup = await groupDao.updateGroup(req.params.id, req.body);
    if (!updatedGroup) {
      const err = new Error('Unable to update group.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    res.status(200).json({
      id: updatedGroup._id,
      experience: updatedGroup.experience,
      isActive: updatedGroup.isActive,
      startDate: updatedGroup.startDate,
      endDate: updatedGroup.endDate,
      registrationEndDate: updatedGroup.registrationEndDate,
      dateText: updatedGroup.dateText,
      price: updatedGroup.price,
      thriveCartScriptId: updatedGroup.thriveCartScriptId,
      capacity: updatedGroup.capacity,
      description: updatedGroup.description,
      groupLead: updatedGroup.groupLead
    });
    return;
  })
];
