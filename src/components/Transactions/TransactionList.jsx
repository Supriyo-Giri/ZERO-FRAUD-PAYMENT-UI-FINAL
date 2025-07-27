import React, { useState } from 'react';
import TransactionItem from './TransactionItem';

// Dummy transaction data
const dummyTransactions = [
  {
    id: 'TXN001',
    timestamp: '2023-05-15 14:30:22',
    flagged: false,
    verified: true
  },
  {
    id: 'TXN002',
    timestamp: '2023-05-16 09:15:45',
    flagged: true,
    verified: false
  },
  {
    id: 'TXN003',
    timestamp: '2023-05-17 16:45:10',
    flagged: false,
    verified: true
  },
  {
    id: 'TXN004',
    timestamp: '2023-05-18 11:20:33',
    flagged: false,
    verified: false
  },
  {
    id: 'TXN005',
    timestamp: '2023-05-19 13:45:12',
    flagged: true,
    verified: true
  }
];

const TransactionList = () => {
  const [transactions, setTransactions] = useState(dummyTransactions);

  const handleFlagChange = (id) => {
    setTransactions(transactions.map(txn => 
      txn.id === id ? { ...txn, flagged: !txn.flagged } : txn
    ));
  };

  return (
    <div className="transaction-list">
      <div className="transaction-header">
        <h4 className="mb-0">Transaction History</h4>
      </div>
      {transactions.map(transaction => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onFlagChange={handleFlagChange}
        />
      ))}
    </div>
  );
};

export default TransactionList;