import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import expressAsyncHandler from 'express-async-handler';
import logger from '../../lib/logger';
import orderDao from '../../dao/order/orderDao';
import { isAdmin } from '../../middleware/adminMiddleware';
import { isAuthenticated } from '../../middleware/authMiddleware';

/**
 * @api {get} /admin/v1/order Get orders
 * @apiDescription Get all orders
 * @apiPermission None
 * @apiVersion 1.0.0
 * @apiName GetOrders
 * @apiGroup Admin
 *
 */
export const ordersGetController = [
  isAuthenticated,
  isAdmin,
  expressAsyncHandler(async function (req: Request, res: Response) {
    // Find the validation errors from the request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(errors);
      res.status(404).json(errors);
      return;
    }

    // Find experiences
    const orders = await orderDao.getOrders();

    res.status(200).json(orders);
    return;
  })
];
