import mongoose from 'mongoose';

interface Order extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  invoiceId: string;
  productName: string;
  orderDate: string;
  orderTimestamp: string;
  currency: string;
  thrivecartCustomerId: string;
  amount: string;
  status: string;
  group: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

const orderSchema = new mongoose.Schema<Order>(
  {
    invoiceId: { type: String },
    productName: { type: String },
    orderDate: { type: String },
    orderTimestamp: { type: String },
    currency: { type: String },
    thrivecartCustomerId: { type: String },
    amount: { type: String },
    status: { type: String },
    group: { type: mongoose.Types.ObjectId, ref: 'Group' },
    user: { type: mongoose.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model<Order>('Order', orderSchema);

export default Order;
