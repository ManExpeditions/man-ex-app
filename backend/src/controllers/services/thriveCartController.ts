import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import experienceDao from '../../dao/experiences/experienceDao';
import userDao from '../../dao/users/userDao';
import logger from '../../lib/logger';
import Order from '../../models/order';

export const thriveCartController = [
  // Requires user to be authenticated
  expressAsyncHandler(async function (req: Request, res: Response) {
    const body = req.body;

    if (body.event !== 'order.success') {
      res.status(200).json({ message: 'success' });
      return;
    }

    const experience = await experienceDao.find_experience_by_group_label(
      body.base_product_label
    );
    if (!experience) {
      const err = new Error('Experience not found');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    const user = await userDao.find_user_by_email(body.customer.email);
    if (!user) {
      const err = new Error('User associated with product not found.');
      logger.error(err.message);
      return;
    }

    // const updatedExperience =
    //   await experienceDao.add_going_user_to_experience_group(
    //     body.base_product_label,
    //     user._id
    //   );
    // if (!updatedExperience) {
    //   const err = new Error('User not added to experience group.');
    //   logger.error(err.message);
    //   return;
    // }

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
