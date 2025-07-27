// src/components/Dashboard/AdminDashboard.jsx
import React from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="logo">
          <i className="fas fa-cube"></i>
          <span>Nexus Admin</span>
        </div>
        <div className="user-profile">
          <div className="user-avatar">A</div>
          <div className="user-info">
            <p className="username">Admin User</p>
            <p className="role">Administrator</p>
          </div>
        </div>
      </header>

      {/* Metrics Cards */}
      <div className="metrics-container">
        <div className="metrics-card">
          <h3>Total Revenue</h3>
          <div className="metric-value">$42,568</div>
          <div className="change-indicator">↑ 12.5% from last month</div>
        </div>
        <div className="metrics-card">
          <h3>Active Users</h3>
          <div className="metric-value">1,842</div>
          <div className="change-indicator">↑ 8.3% from last month</div>
        </div>
        <div className="metrics-card">
          <h3>Transactions</h3>
          <div className="metric-value">3,248</div>
          <div className="change-indicator decrease">↓ 2.1% from last month</div>
        </div>
        <div className="metrics-card">
          <h3>Flagged Items</h3>
          <div className="metric-value">24</div>
          <div className="change-indicator">↑ 5.7% from last month</div>
        </div>
      </div>

      {/* Payment Transactions */}
      <div className="payment-section">
        <div className="payment-header">
          <h2>
            <i className="fas fa-money-bill-alt"></i> Payment Transactions
          </h2>
          <div className="search-filter">
            <div className="search-bar">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Search transactions..." />
            </div>
            <button className="filter-btn">
              <i className="fas fa-filter"></i> Filter
            </button>
            <button className="export-btn">
              <i className="fas fa-download"></i> Export
            </button>
          </div>
        </div>
        <table className="payment-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Amount</th>
              <th>Timestamp</th>
              <th>Status</th>
              <th>Flagged</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="user-avatar">JD</div>
                John_Doe
              </td>
              <td>$245.99</td>
              <td>2023-06-15 14:30:22</td>
              <td>
                <span className="status-badge">Payment Successful</span>
              </td>
              <td>
                <input type="checkbox" className="flag-checkbox" />
              </td>
            </tr>
            {/* More rows... */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;