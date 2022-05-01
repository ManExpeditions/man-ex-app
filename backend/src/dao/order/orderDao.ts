import mongoose from 'mongoose';
import Order from '../../models/order';
import Group from '../../models/group';

class OrderDao {
  public async getOrders(): Promise<Order[] | null> {
    const orders = await Order.find({})
      .populate({
        path: 'group',
        select: ['_id']
      })
      .populate({
        path: 'user',
        select: ['_id']
      });
    return orders;
  }

  public async findOrderById(
    id: mongoose.Types.ObjectId | string
  ): Promise<Order | null> {
    const order = await Order.findById(id)
      .populate({
        path: 'group',
        select: ['_id'],
        populate: {
          path: 'groupLead',
          select: ['_id', 'firstName', 'lastName']
        }
      })
      .populate({
        path: 'user',
        select: ['_id']
      });
    return order;
  }

  public async findOrderByUserId(
    userId: mongoose.Types.ObjectId | string
  ): Promise<Order | null> {
    const order = await Order.findOne({ user: userId });
    return order;
  }

  public async makeOrderComplete(
    orderId: mongoose.Types.ObjectId | string
  ): Promise<Order | null> {
    const order = await Order.findByIdAndUpdate(orderId, {
      status: 'complete'
    });
    return order;
  }

  public async createNewOrder(
    orderDetails: {
      order_id: string;
      invoice_id: string;
      base_product_name: string;
      base_product_label: string;
      order_date: string;
      order_timestamp: string;
      currency: string;
      customer: {
        id: string;
      };
      order: {
        total: string;
      };
    },
    userId: mongoose.Types.ObjectId,
    status: string
  ): Promise<Order | null> {
    const order = new Order({
      orderId: orderDetails.order_id,
      invoiceId: orderDetails.invoice_id,
      productName: orderDetails.base_product_name,
      orderDate: orderDetails.order_date,
      orderTimestamp: orderDetails.order_timestamp,
      currency: orderDetails.currency,
      thrivecartCustomerId: orderDetails.customer.id,
      amount: orderDetails.order.total,
      user: userId,
      group: orderDetails.base_product_label,
      status
    });

    // Save the new order
    await order.save();
    return order;
  }

  public async getOrdersByUserId(
    userId: mongoose.Types.ObjectId | string,
    status: string
  ): Promise<Order[] | null> {
    const orders = await Order.find({ user: userId }).populate({
      path: 'group',
      select: ['_id', 'dateText', 'startDate'],
      populate: [
        {
          path: 'groupLead',
          select: ['_id', 'firstName']
        },
        {
          path: 'experience',
          select: ['_id', 'videoThumbnailImage', 'video']
        }
      ]
    });

    const currentDate = new Date().getTime();

    switch (status) {
      case 'upcoming':
        return orders.filter(
          (order) =>
            (order.group as unknown as Group).startDate.getTime() > currentDate
        );
      case 'past':
        return orders.filter(
          (order) =>
            (order.group as unknown as Group).startDate.getTime() < currentDate
        );
      default:
        return orders;
    }
  }
}

export default new OrderDao();
