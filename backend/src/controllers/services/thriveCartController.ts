import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import groupDao from '../../dao/groups/groupDao';
import userDao from '../../dao/users/userDao';
import logger from '../../lib/logger';
import Order from '../../models/order';

export const thriveCartController = [
  expressAsyncHandler(async function (req: Request, res: Response) {
    const body = req.body;

    if (body.event !== 'order.success') {
      res.status(200).json({ message: 'success' });
      return;
    }

    // Check if group exists
    const group = await groupDao.findGroupById(body.base_product_label);
    if (!group) {
      const err = new Error('No group found associated with the order');
      logger.error(err.message);
      res.status(400);
      return;
    }

    // Check if user exists
    const user = await userDao.findUserByEmail(body.customer.email);
    if (!user) {
      const err = new Error('User associated with product not found.');
      logger.error(err.message);
      res.status(400);
      return;
    }

    // Check if user already in goingList
    const userAlreadyGoing = groupDao.userExistsInGroupGoingUsers(
      user._id,
      group
    );
    if (userAlreadyGoing) {
      const err = new Error('User already in going list for this group');
      logger.error(err.message);
      res.status(400);
      return;
    }

    // Add user to goingList
    await groupDao.addGoingUserToGroup(group, user._id);

    // Create an order
    const order = new Order({
      orderId: body.order_id,
      invoiceId: body.invoice_id,
      productName: body.base_product_name,
      groupLabel: body.base_product_label,
      orderDate: body.order_date,
      orderTimestamp: body.order_timestamp,
      currency: body.currency,
      thrivecartCustomerId: body.customer.id,
      amount: body.order.total,
      user: user._id
    });

    // Save the new order
    await order.save();

    res.status(200).send({ message: 'success' });
    return;
  })
];
