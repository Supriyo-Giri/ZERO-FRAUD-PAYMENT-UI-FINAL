import React from 'react';

const TransactionItem = ({ transaction, onFlagChange }) => {
  return (
    <div className="transaction-item">
      <div className="transaction-info">
        <div className="transaction-id">#{transaction.id}</div>
        <div className="transaction-meta">
          <span><i className="far fa-clock mr-1"></i> {transaction.timestamp}</span>
          <span className={`transaction-status ${transaction.verified ? 'verified' : 'pending'}`}>
            <i className={`fas ${transaction.verified ? 'fa-check-circle' : 'fa-clock'} mr-1`}></i>
            {transaction.verified ? 'Verified' : 'Pending'}
          </span>
        </div>
      </div>
      <div className="transaction-actions">
        <label className="flag-checkbox">
          <input
            type="checkbox"
            checked={transaction.flagged}
            onChange={() => onFlagChange(transaction.id)}
          />
          <span>Flag</span>
        </label>
      </div>
    </div>
  );
};

export default TransactionItem;