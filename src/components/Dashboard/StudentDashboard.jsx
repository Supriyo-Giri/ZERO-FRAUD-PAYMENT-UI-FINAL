// src/components/Dashboard/StudentDashboard.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

// Accept paymentHistory and userName as props
const StudentDashboard = ({ paymentHistory = [], userName = "Student" }) => {
  const navigate = useNavigate();

  // State for selected payment method (for Make Payment view)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  // State for active tab: 'make-payment' or 'payment-history'
  const [activeTab, setActiveTab] = useState('make-payment');

  // State for QR modal
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [currentQRData, setCurrentQRData] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);

  // Handle payment method selection (for Make Payment view)
  const handlePaymentMethodClick = (method) => {
    setSelectedPaymentMethod(method);
  };

  // Handle "Proceed to Payment" button click (for Make Payment view)
  const handleProceedToPayment = () => {
    // Navigate to a sample payment page
    navigate('/payment/sample-event-id');
  };

  // Ensure we have a valid string for the avatar and display name
  const displayName = userName || "Student";
  const avatarLetter = displayName.charAt(0).toUpperCase();

  // --- QR Code Logic for History ---
  // Handle showing QR for a transaction in history
  const handleShowQR = (transaction) => {
    if (transaction.status === 'Success' && transaction.hashCode && transaction.hashCode !== 'N/A') {
      const qrData = `PAYMENT_VERIFIED:${transaction.hashCode}:${Date.now()}`;
      setCurrentQRData(qrData);
      setTimeLeft(30);
      setIsQRModalOpen(true);
    } else {
      alert("QR Code not available for this transaction.");
    }
  };

  // Handle QR code regeneration and timer for history QR
  useEffect(() => {
    let timer;
    if (isQRModalOpen) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            const parts = currentQRData.split(':');
            if (parts.length >= 3) {
              const newQRData = `${parts[0]}:${parts[1]}:${Date.now()}`;
              setCurrentQRData(newQRData);
            }
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isQRModalOpen, currentQRData]);

  // Handle closing the QR modal
  const closeQRModal = () => {
    setIsQRModalOpen(false);
    setCurrentQRData('');
    setTimeLeft(30);
  };
  // --- End QR Code Logic ---

  return (
    <div className="student-dashboard">
      {/* Header with dynamic user name */}
      <header className="dashboard-header">
        <div className="logo">
          <i className="fas fa-shield-alt"></i>
          <span>ZeroFraud Student Payments</span>
        </div>
        <div className="user-profile">
          <div className="avatar">
            <span>{avatarLetter}</span>
          </div>
          <div className="user-info">
            <p className="username">{displayName}</p>
            <p className="role">Student</p>
          </div>
        </div>
      </header>

      {/* Tabs - Updated to control active view */}
      <nav className="tabs">
        <button
          className={`tab ${activeTab === 'make-payment' ? 'active' : ''}`}
          onClick={() => setActiveTab('make-payment')}
        >
          Make Payment
        </button>
        <button
          className={`tab ${activeTab === 'payment-history' ? 'active' : ''}`}
          onClick={() => setActiveTab('payment-history')}
        >
          Payment History
        </button>
      </nav>

      {/* Conditional Rendering based on activeTab */}
      {activeTab === 'make-payment' && (
        <>
          {selectedPaymentMethod === null ? (
            <main className="payment-section">
              <h2 className="section-title">Secure Payment</h2>

              {/* Payment Options */}
              <div className="payment-options">
                <div
                  className={`payment-option upi-payment ${selectedPaymentMethod === 'upi' ? 'selected' : ''}`}
                  onClick={() => handlePaymentMethodClick('upi')}
                >
                  <i className="fas fa-mobile-alt"></i>
                  <h3>UPI Payment</h3>
                  <p>Pay using any UPI app</p>
                </div>
                <div
                  className={`payment-option card-payment ${selectedPaymentMethod === 'card' ? 'selected' : ''}`}
                  onClick={() => handlePaymentMethodClick('card')}
                >
                  <i className="fas fa-credit-card"></i>
                  <h3>Credit/Debit Card</h3>
                  <p>Pay with card details</p>
                </div>
                <div
                  className={`payment-option wallet-payment ${selectedPaymentMethod === 'paytm' ? 'selected' : ''}`}
                  onClick={() => handlePaymentMethodClick('paytm')}
                >
                  <i className="fas fa-wallet"></i>
                  <h3>Paytm Wallet</h3>
                  <p>Pay using Paytm balance</p>
                </div>
                <div
                  className={`payment-option qr-code-payment ${selectedPaymentMethod === 'qr' ? 'selected' : ''}`}
                  onClick={() => handlePaymentMethodClick('qr')}
                >
                  <i className="fas fa-qrcode"></i>
                  <h3>QR Code</h3>
                  <p>Show QR to scan and pay</p>
                </div>
              </div>

              {/* Payment Form (simplified for example) */}
              <form className="payment-form">
                <div className="form-group">
                  <label htmlFor="recipient">Recipient/Vendor</label>
                  <input
                    type="text"
                    id="recipient"
                    placeholder="Enter recipient name"
                    value="College Fest Committee"
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="amount">Amount (₹)</label>
                  <input
                    type="number"
                    id="amount"
                    placeholder="Enter amount"
                    value="450"
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description (Optional)</label>
                  <textarea
                    id="description"
                    placeholder="Enter description"
                    value="Registration for Annual Fest"
                    readOnly
                  ></textarea>
                </div>
              </form>

              {/* Security Features */}
              <div className="security-features">
                <div className="feature">
                  <i className="fas fa-lock"></i>
              <p>End-to-End Encryption</p>
            </div>
            <div className="feature">
              <i className="fas fa-shield-alt"></i>
              <p>2-Factor Authentication</p>
            </div>
            <div className="feature">
              <i className="fas fa-check-circle"></i>
              <p>Verified Vendors</p>
            </div>
            <div className="feature">
              <i className="fas fa-sync-alt"></i>
              <p>Instant Verification</p>
            </div>
          </div>

          {/* Proceed to Payment Button */}
          <button
            className="btn btn-primary"
            onClick={handleProceedToPayment}
          >
            Proceed to Payment
          </button>

          {/* Success Notification (example) */}
          <div className="success-notification">
            <i className="fas fa-check-circle"></i>
            <h3>No real Payments are done, only for demo!</h3>
          </div>
        </main>
      ) : (
        // Display selected payment method if one is chosen
        <div className="selected-payment-method">
          <h2>You've chosen:</h2>
          <p>
            {selectedPaymentMethod === 'upi'
              ? 'UPI Payment'
              : selectedPaymentMethod === 'card'
              ? 'Credit/Debit Card'
              : selectedPaymentMethod === 'paytm'
              ? 'Paytm Wallet'
              : 'QR Code'}
          </p>
          <button
            className="btn btn-secondary"
            onClick={() => setSelectedPaymentMethod(null)}
          >
            Back to Payment Methods
          </button>
        </div>
      )}
    </>
  )}

  {/* Payment History View - Use the passed prop */}
  {activeTab === 'payment-history' && (
    <main className="payment-history-section">
      <h2 className="section-title">Your Payment History</h2>
      <div className="history-container">
        {paymentHistory && paymentHistory.length > 0 ? (
          <table className="history-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date & Time</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Hash</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((transaction) => (
                <tr key={transaction.id}>
                  <td data-label="Transaction ID">{transaction.id}</td>
                  <td data-label="Date & Time">{transaction.date} {transaction.time}</td>
                  <td data-label="Description">{transaction.description}</td>
                  <td data-label="Amount">{transaction.amount}</td>
                  <td data-label="Status">
                    <span className={`status ${transaction.status.toLowerCase()}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td data-label="Hash">{transaction.hashCode}</td>
                  <td data-label="Actions">
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleShowQR(transaction)}
                      disabled={transaction.status !== 'Success' || !transaction.hashCode || transaction.hashCode === 'N/A'}
                    >
                      Show QR
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-history">No payment history found.</p>
        )}
      </div>
    </main>
  )}

  {/* QR Code Modal for History */}
  {isQRModalOpen && (
    <div className="qr-modal-overlay" onClick={closeQRModal}>
      <div className="qr-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="qr-modal-header">
          <h3>Payment Verification QR</h3>
          <button className="qr-modal-close" onClick={closeQRModal}>
            &times;
          </button>
        </div>
        <div className="qr-modal-body">
          <div className="qr-code-display">
            <QRCodeSVG value={currentQRData} size={200} level="H" includeMargin={true} />
          </div>
          <p className="qr-info">
            This QR code contains your payment verification hash and expires in <span className="timer">{timeLeft}s</span>.
          </p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(timeLeft / 30) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )}
</div>
);
};

export default StudentDashboard;