import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  adminUsersGet,
  resetAdminUsersGet
} from '../../slices/admin/adminUsersGetSlice';

export default function AdminUsersList({ setSubPage }) {
  const adminUsersGetSlice = useSelector((state) => state.adminUsersGetSlice);
  const { users, error } = adminUsersGetSlice;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(adminUsersGet({}));
  }, [dispatch]);
  // Cleanup
  useEffect(() => {
    return () => {
      dispatch(resetAdminUsersGet());
    };
  }, [dispatch]);

  return (
    <div>
      {users && (
        <>
          <div className="flex-box space-between">
            {/* <button
              onClick={() => dispatch(adminUserCreate({}))}
              className="admin-action-button"
            >
              {loading ? <Spinner /> : 'Create User'}
            </button> */}
            <span className="error-message">{error}</span>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>User Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Country</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, userIdx) => (
                <tr
                  key={userIdx}
                  onClick={() =>
                    setSubPage({
                      path: 'user',
                      props: {
                        userId: user._id
                      }
                    })
                  }
                >
                  <td>{user._id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.country}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
