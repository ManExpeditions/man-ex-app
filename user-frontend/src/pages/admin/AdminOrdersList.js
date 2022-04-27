import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  adminOrdersGet,
  resetAdminOrdersGet
} from '../../slices/admin/adminOrdersGetSlice';

export default function AdminOrdersList({ setSubPage }) {
  const adminOrdersGetSlice = useSelector((state) => state.adminOrdersGetSlice);
  const { orders, error } = adminOrdersGetSlice;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(adminOrdersGet({}));
  }, [dispatch]);
  // Cleanup
  useEffect(() => {
    return () => {
      dispatch(resetAdminOrdersGet());
    };
  }, [dispatch]);

  return (
    <div>
      {orders && (
        <>
          <div className="flex-box space-between">
            <span className="error-message">{error}</span>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Name</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Group Id</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, orderIdx) => (
                <tr
                  key={orderIdx}
                  onClick={() =>
                    setSubPage({
                      path: 'order',
                      props: {
                        userId: order._id
                      }
                    })
                  }
                >
                  <td>{order._id}</td>
                  <td>{order.productName}</td>
                  <td>{order.orderDate}</td>
                  <td>{order.amount}</td>
                  <td>{order.status}</td>
                  <td>{order.group && order.group._id}</td>
                  <td>{order.user && order.user._id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
