import React, { useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 'TXN001',
      userId: 'John_Doe',
      amount: '$245.99',
      timestamp: '2023-06-15 14:30:22',
      status: 'Payment Successful',
      flagged: false
    },
    {
      id: 'TXN002',
      userId: 'Sarah_Jones',
      amount: '$120.50',
      timestamp: '2023-06-15 13:45:10',
      status: 'Payment Successful',
      flagged: true
    },
    {
      id: 'TXN003',
      userId: 'Mike_Johnson',
      amount: '$89.99',
      timestamp: '2023-06-15 12:20:45',
      status: 'Payment Successful',
      flagged: false
    },
    {
      id: 'TXN004',
      userId: 'Emily_Davis',
      amount: '$350.00',
      timestamp: '2023-06-15 11:30:12',
      status: 'Payment Successful',
      flagged: false
    },
    {
      id: 'TXN005',
      userId: 'Robert_Brown',
      amount: '$67.25',
      timestamp: '2023-06-15 10:15:33',
      status: 'Payment Successful',
      flagged: true
    }
  ]);

  const handleFlagChange = (id) => {
    setTransactions(transactions.map(txn => 
      txn.id === id ? { ...txn, flagged: !txn.flagged } : txn
    ));
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="logo">
          <i className="fas fa-cube"></i>
          <span>Zero-Fraud-Payment-UI Admin</span>
        </div>
        <div className="user-profile">
          <div className="user-avatar">A</div>
          <div className="user-info">
            <p className="username">Admin User</p>
            <p className="role">Administrator</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="admin-main">
        {/* Metrics Cards */}
        <section className="metrics-section">
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon revenue">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <div className="metric-info">
                <h3>Total Revenue</h3>
                <p className="metric-value">र900</p>
                <p className="metric-change positive">↑ 12.5% from last month</p>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon users">
                <i className="fas fa-users"></i>
              </div>
              <div className="metric-info">
                <h3>Active Users</h3>
                <p className="metric-value">1,842</p>
                <p className="metric-change positive">↑ 8.3% from last month</p>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon transactions">
                <i className="fas fa-exchange-alt"></i>
              </div>
              <div className="metric-info">
                <h3>Transactions</h3>
                <p className="metric-value">3,248</p>
                <p className="metric-change negative">↓ 2.1% from last month</p>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon flagged">
                <i className="fas fa-flag"></i>
              </div>
              <div className="metric-info">
                <h3>Flagged Items</h3>
                <p className="metric-value">2</p>
                <p className="metric-change positive">↑ 5.7% from last month</p>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Transactions */}
        <section className="transactions-section">
          <div className="section-header">
            <h2>
              <i className="fas fa-money-bill-alt"></i>
              Payment Transactions
            </h2>
            <div className="controls">
              <div className="search-bar">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Search transactions..." />
              </div>
              <button className="btn btn-secondary">
                <i className="fas fa-filter"></i> Filter
              </button>
              <button className="btn btn-primary">
                <i className="fas fa-download"></i> Export
              </button>
            </div>
          </div>
          
          <div className="table-container">
            <table className="transactions-table">
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
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar">{transaction.userId.charAt(0)}</div>
                        {transaction.userId}
                      </div>
                    </td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.timestamp}</td>
                    <td>
                      <span className="status-badge success">
                        {transaction.status}
                      </span>
                    </td>
                    <td>
                      <div className="flag-cell">
                        <label className="checkbox-container">
                          <input
                            type="checkbox"
                            checked={transaction.flagged}
                            onChange={() => handleFlagChange(transaction.id)}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;