import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  adminOrderGet,
  resetAdminOrderGet
} from '../../slices/admin/adminOrderGetSlice';

export default function AdminOrderPage({ orderId, setSubPage }) {
  // Experience states
  const [id, setId] = useState(true);
  const [invoiceId, setInvoiceId] = useState('');
  const [productName, setProductName] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [orderTimestamp, setOrderTimestamp] = useState('');
  const [currency, setCurrency] = useState('');
  const [thrivecartCustomerId, setThrivecartCustomerId] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [groupId, setGroupId] = useState('');
  const [groupLeadName, setGroupLeadName] = useState('');
  const [userId, setUserId] = useState('');

  const adminOrderGetSlice = useSelector((state) => state.adminOrderGetSlice);
  const { order, error } = adminOrderGetSlice;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!order) {
      dispatch(adminOrderGet(orderId));
    } else {
      setId(orderId);
      setInvoiceId(order.invoiceId);
      setProductName(order.productName);
      setOrderDate(order.orderDate);
      setOrderTimestamp(order.orderTimestamp);
      setCurrency(order.currency);
      setThrivecartCustomerId(order.thrivecartCustomerId);
      setAmount(order.amount);
      setStatus(order.status);
      setGroupId(order.group ? order.group._id : '');
      setGroupLeadName(
        order.group && order.group.groupLead
          ? order.group.groupLead.firstName
          : ''
      );
      setUserId(order.user ? order.user._id : '');
    }
  }, [dispatch, order, orderId]);

  // Cleanup when component is lifted
  useEffect(() => {
    return () => {
      dispatch(resetAdminOrderGet());
    };
  }, [dispatch]);

  return (
    <div>
      <button
        className="admin-back-button"
        onClick={() => setSubPage({ path: 'users' })}
      >
        Back
      </button>
      <>
        <br />
        <span className="error-message">{error}</span>
        <div className="admin-input-box-wrapper">
          <div className="flex-box space-between">
            <div>
              <h1>Order Id: {id}</h1>
            </div>
          </div>
          <div className="admin-input-box">
            <label>Invoice Id</label>
            <input
              disabled
              className="input"
              value={invoiceId}
              onChange={(e) => setInvoiceId(e.target.value)}
            />
          </div>
          <div className="admin-input-box">
            <label>Name</label>
            <input
              disabled
              className="input"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="admin-input-box">
            <label>Date</label>
            <input
              disabled
              className="input"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
            />
          </div>
          <div className="admin-input-box">
            <label>Timestamp</label>
            <input
              disabled
              className="input"
              value={orderTimestamp}
              onChange={(e) => setOrderTimestamp(e.target.value)}
            />
          </div>
          <div className="admin-input-box">
            <label>Currency</label>
            <input
              disabled
              className="input"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            />
          </div>
          <div className="admin-input-box">
            <label>Thrivecart customer Id</label>
            <input
              disabled
              className="input"
              value={thrivecartCustomerId}
              onChange={(e) => setThrivecartCustomerId(e.target.value)}
            />
          </div>
          <div className="admin-input-box">
            <label>Amount</label>
            <input
              disabled
              className="input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="admin-input-box">
            <label>Status</label>
            <select
              disabled
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="selectbox admin-selectbox"
            >
              <option value={'complete'}>Complete</option>
              <option value={'pending'}>Pending</option>
            </select>
          </div>
          <div className="admin-input-box">
            <label>Group Id</label>
            <input
              disabled
              className="input"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
            />
          </div>
          <div className="admin-input-box">
            <label>Group Lead</label>
            <input
              disabled
              className="input"
              value={groupLeadName}
              onChange={(e) => setGroupLeadName(e.target.value)}
            />
          </div>
          <div className="admin-input-box">
            <label>User Id</label>
            <input
              disabled
              className="input"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
        </div>
      </>
    </div>
  );
}
