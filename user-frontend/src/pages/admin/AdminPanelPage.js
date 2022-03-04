import React, { useState } from 'react';
import { ProSidebar, SidebarHeader, Menu, MenuItem } from 'react-pro-sidebar';
import { FaGem, FaSwimmer } from 'react-icons/fa';
import AdminExperiencesList from './AdminExperiencesList';

export default function AdminPanelPage() {
  const [index, setIndex] = useState(1);

  return (
    <div className="admin-page">
      <div className="admin-container">
        <ProSidebar className="admin-sidebar">
          <SidebarHeader>
            <h1 className="admin-sidebar-header">Admin</h1>
          </SidebarHeader>
          <Menu iconShape="square">
            <MenuItem icon={<FaGem />} onClick={() => setIndex(0)}>
              Dashboard
            </MenuItem>
            <MenuItem icon={<FaSwimmer />} onClick={() => setIndex(1)}>
              Experiences
            </MenuItem>
          </Menu>
        </ProSidebar>
        <div className="admin-main-content">
          {index === 1 ? (
            <AdminExperiencesList setIndex={setIndex}></AdminExperiencesList>
          ) : (
            'Default'
          )}
        </div>
      </div>
    </div>
  );
}
