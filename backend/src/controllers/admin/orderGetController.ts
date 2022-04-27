import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { param, validationResult } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import orderDao from '../../dao/order/orderDao';
import logger from '../../lib/logger';
import { isAdmin } from '../../middleware/adminMiddleware';
import { isAuthenticated } from '../../middleware/authMiddleware';

/**
 * @api {get} /admin/v1/order/:id Get order
 * @apiDescription Get order with id
 * @apiPermission Authentication Admin
 * @apiVersion 1.0.0
 * @apiName GetOrder
 * @apiGroup Admin
 */
export const orderGetController = [
  isAuthenticated,
  isAdmin,
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
    const orderId = req.params.id;
    if (!isValidObjectId(orderId)) {
      const err = new Error('Order id is not valid');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }
    // Check if order does not exist
    const order = await orderDao.findOrderById(orderId);
    if (!order) {
      const err = new Error('Order does not exist.');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    res.status(200).json(order);
    return;
  })
];
