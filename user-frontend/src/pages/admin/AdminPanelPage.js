import React, { useState } from 'react';
import { ProSidebar, SidebarHeader, Menu, MenuItem } from 'react-pro-sidebar';
import { FaGem, FaSwimmer } from 'react-icons/fa';
import AdminExperiencesList from './AdminExperiencesList';
import AdminExperiencePage from './AdminExperiencePage';

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
              icon={<FaSwimmer />}
              onClick={() => setSubPage({ path: 'experiences' })}
            >
              Experiences
            </MenuItem>
          </Menu>
        </ProSidebar>
        <div className="admin-main-content">{renderPage(subPage)}</div>
      </div>
    </div>
  );
}
