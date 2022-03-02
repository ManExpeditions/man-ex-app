import mongoose from 'mongoose';

interface Order {
  _id: mongoose.Types.ObjectId;
  invoiceId: string;
  productName: string;
  groupLabel: string;
  orderDate: string;
  orderTimestamp: string;
  currency: string;
  thrivecartCustomerId: string;
  amount: string;
  user: mongoose.Types.ObjectId;
}

const orderSchema = new mongoose.Schema<Order>(
  {
    orderId: { type: String },
    invoiceId: { type: String },
    productName: { type: String },
    groupLabel: { type: String },
    orderDate: { type: String },
    orderTimestamp: { type: String },
    currency: { type: String },
    thrivecartCustomerId: { type: String },
    amount: { type: String },
    user: { type: mongoose.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model<Order>('Order', orderSchema);

export default Order;
