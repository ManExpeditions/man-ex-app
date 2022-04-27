import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import groupDao from '../../dao/groups/groupDao';
import orderDao from '../../dao/order/orderDao';
import userDao from '../../dao/users/userDao';
import logger from '../../lib/logger';

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
      res.status(400).send({ message: err.message });
      return;
    }

    // Check if user exists
    const user = await userDao.findUserByEmail(body.customer.email);
    if (!user) {
      const err = new Error('User associated with product not found.');
      logger.error(err.message);
      res.status(400).send({ message: err.message });
      return;
    }

    // Check if user already in goingList
    const userAlreadyGoing = groupDao.userExistsInGroupGoingUsers(
      user._id,
      group
    );
    if (userAlreadyGoing) {
      const err = new Error('User already in going list for this group.');
      logger.error(err.message);
      res.status(400).send({ message: err.message });
      return;
    }

    // Add user to goingList
    await groupDao.addGoingUserToGroup(group, user._id);

    // Create a new order with status complete
    const order = await orderDao.createNewOrder(body, user._id, 'complete');

    if (order) {
      res.status(200).send({ message: 'success' });
      return;
    }

    // There must be an error if order not created
    const err = new Error('Unable to create order.');
    logger.error(err.message);
    res.status(400).send({ message: err.message });
    return;
  })
];
