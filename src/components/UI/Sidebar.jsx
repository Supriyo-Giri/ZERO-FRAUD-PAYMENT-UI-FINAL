import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ userType }) => {
  const location = useLocation();

  const adminNavItems = [
    { name: 'Dashboard', path: '/admin-dashboard', icon: 'fas fa-tachometer-alt' },
    { name: 'Transactions', path: '/admin-dashboard', icon: 'fas fa-exchange-alt' },
    { name: 'Reports', path: '#', icon: 'fas fa-chart-bar' },
    { name: 'Settings', path: '#', icon: 'fas fa-cog' }
  ];

  const studentNavItems = [
    { name: 'Dashboard', path: '/student-dashboard', icon: 'fas fa-tachometer-alt' },
    { name: 'Events', path: '/student-dashboard', icon: 'fas fa-calendar-alt' },
    { name: 'Payments', path: '#', icon: 'fas fa-credit-card' },
    { name: 'Profile', path: '#', icon: 'fas fa-user' }
  ];

  const navItems = userType === 'admin' ? adminNavItems : studentNavItems;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Transaction App</h3>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item, index) => (
          <div className="nav-item" key={index}>
            <Link 
              to={item.path} 
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <i className={`${item.icon} nav-icon`}></i>
              <span className="nav-label">{item.name}</span>
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;