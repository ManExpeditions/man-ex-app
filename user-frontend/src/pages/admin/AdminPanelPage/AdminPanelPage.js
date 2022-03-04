import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminPanelPage() {
  return (
    <div className="admin-page">
      <h1>Admin Page</h1>
      <div className="admin-flex">
        <Link className="admin-card" to="/manexadmin/users">
          Users
        </Link>
        <Link className="admin-card" to="/manexadmin/experiences">
          Experiences
        </Link>
        <Link className="admin-card" to="/manexadmin/groups">
          Groups
        </Link>
      </div>
    </div>
  );
}
