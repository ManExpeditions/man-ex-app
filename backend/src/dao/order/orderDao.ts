import mongoose from 'mongoose';
import Order from '../../models/order';

class OrderDao {
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
      groupLabel: orderDetails.base_product_label,
      orderDate: orderDetails.order_date,
      orderTimestamp: orderDetails.order_timestamp,
      currency: orderDetails.currency,
      thrivecartCustomerId: orderDetails.customer.id,
      amount: orderDetails.order.total,
      user: userId,
      status
    });

    // Save the new order
    await order.save();
    return order;
  }
}

export default new OrderDao();
