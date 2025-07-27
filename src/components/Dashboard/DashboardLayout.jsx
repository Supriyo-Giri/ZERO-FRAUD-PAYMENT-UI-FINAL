import React from 'react';
import Sidebar from '../UI/Sidebar';

const DashboardLayout = ({ userType, children }) => {
  const handleLogout = () => {
    // Logout logic will be implemented later
    window.location.href = '/login';
  };

  return (
    <div className="dashboard-layout">
      <Sidebar userType={userType} />
      <div className="main-content">
        <div className="topbar">
          <h1 className="topbar-title">
            {userType === 'admin' ? 'Admin Dashboard' : 'Student Dashboard'}
          </h1>
          <div className="user-menu">
            <div className="user-avatar">
              {userType === 'admin' ? 'A' : 'S'}
            </div>
            <button 
              className="btn btn-outline btn-sm"
              onClick={handleLogout}
            >
              <i className="fas fa-sign-out-alt mr-2"></i>
              Logout
            </button>
          </div>
        </div>
        <div className="content-wrapper">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;