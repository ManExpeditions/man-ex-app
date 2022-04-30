import React, { useState } from 'react';
import { ProSidebar, SidebarHeader, Menu, MenuItem } from 'react-pro-sidebar';
import { FaGem } from 'react-icons/fa';
import { BsClipboardCheck, BsCalendar } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import AdminExperiencesList from './AdminExperiencesList';
import AdminExperiencePage from './AdminExperiencePage';
import AdminUsersList from './AdminUsersList';
import AdminUserPage from './AdminUserPage';
import AdminOrdersList from './AdminOrdersList';
import AdminOrderPage from './AdminOrderPage';

export default function AdminPanelPage() {
  const [subPage, setSubPage] = useState({});

  const renderPage = () => {
    switch (subPage.path) {
      case 'experiences':
        return (
          <AdminExperiencesList setSubPage={setSubPage}></AdminExperiencesList>
        );
      case 'experience':
        return (
          <AdminExperiencePage
            {...subPage.props}
            setSubPage={setSubPage}
          ></AdminExperiencePage>
        );
      case 'users':
        return (
          <AdminUsersList
            {...subPage.props}
            setSubPage={setSubPage}
          ></AdminUsersList>
        );
      case 'user':
        return (
          <AdminUserPage
            {...subPage.props}
            setSubPage={setSubPage}
          ></AdminUserPage>
        );
      case 'order':
        return (
          <AdminOrderPage
            {...subPage.props}
            setSubPage={setSubPage}
          ></AdminOrderPage>
        );
      case 'orders':
        return (
          <AdminOrdersList
            {...subPage.props}
            setSubPage={setSubPage}
          ></AdminOrdersList>
        );
      default:
        return 'Default';
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <ProSidebar className="admin-sidebar">
          <SidebarHeader>
            <h1 className="admin-sidebar-header">Admin</h1>
          </SidebarHeader>
          <Menu iconShape="square">
            <MenuItem
              icon={<FaGem />}
              onClick={() => setSubPage({ path: 'default' })}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              icon={<FiUsers />}
              onClick={() => setSubPage({ path: 'users' })}
            >
              Users
            </MenuItem>
            <MenuItem
              icon={<BsCalendar />}
              onClick={() => setSubPage({ path: 'experiences' })}
            >
              Experiences
            </MenuItem>
            <MenuItem
              icon={<BsClipboardCheck />}
              onClick={() => setSubPage({ path: 'orders' })}
            >
              Orders
            </MenuItem>
          </Menu>
        </ProSidebar>
        <div className="admin-main-content">{renderPage(subPage)}</div>
      </div>
    </div>
  );
}
