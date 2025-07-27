// src/components/Payment/PaymentPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

const PaymentPage = ({ onPaymentSuccess }) => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [transactionData, setTransactionData] = useState(null);
  const [qrCodeData, setQrCodeData] = useState(''); // For payment QR
  const [timeLeft, setTimeLeft] = useState(30); // For payment QR timer
  const [isPaymentActive, setIsPaymentActive] = useState(false);

  // For Verification QR on success page
  const [verificationQRData, setVerificationQRData] = useState('');
  const [verificationTimeLeft, setVerificationTimeLeft] = useState(30);

  // Generate initial payment QR code data
  useEffect(() => {
    generateQRCode();
  }, []);

  // Handle Payment QR code regeneration every 30 seconds
  useEffect(() => {
    let timer;
    if (isPaymentActive) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === 1) {
            generateQRCode(); // Regenerate payment QR
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isPaymentActive]);

  // Handle Verification QR code regeneration every 30 seconds (AFTER payment)
  useEffect(() => {
    let verificationTimer;
    if (paymentStatus === 'success' && transactionData) {
      // Generate initial verification QR
      generateVerificationQRCode();

      verificationTimer = setInterval(() => {
        setVerificationTimeLeft(prev => {
          if (prev === 1) {
            generateVerificationQRCode(); // Regenerate verification QR
            return 30; // Reset verification timer
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (verificationTimer) clearInterval(verificationTimer);
    };
  }, [paymentStatus, transactionData]); // Depend on payment success state

  const generateQRCode = () => {
    const newQRData = `EVENT_PAYMENT:${eventId}:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`;
    setQrCodeData(newQRData);
  };

  const generateVerificationQRCode = () => {
    if (transactionData && transactionData.hashCode) {
      // Include the hash code and a new timestamp for verification QR
      const newVerificationQRData = `PAYMENT_VERIFIED:${transactionData.hashCode}:${Date.now()}`;
      setVerificationQRData(newVerificationQRData);
    }
  };

  const handlePayment = () => {
    setIsPaymentActive(true);
    generateQRCode();
    setTimeLeft(30);
  };

  const handlePayNow = () => {
    // Generate dummy transaction data
    const newTransaction = {
      id: `TXN${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toISOString().split('T')[1].split('.')[0],
      description: `Payment for Event ${eventId}`,
      amount: '₹450.00',
      status: 'Success',
      hashCode: `HASH${Math.random().toString(36).substr(2, 9).toUpperCase()}` // Generate a real hash
    };

    setTransactionData(newTransaction);
    setPaymentStatus('success');
    setIsPaymentActive(false);
    // Initialize verification timer state
    setVerificationTimeLeft(30);

    if (onPaymentSuccess) {
      onPaymentSuccess(newTransaction);
    }

    console.log('Payment successful:', newTransaction);
  };

  const handleBackToDashboard = () => {
    navigate('/student-dashboard');
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        {paymentStatus === null ? (
          <>
            <div className="payment-header">
              <h2>Payment for Event</h2>
              <p className="mb-0">Event ID: {eventId}</p>
            </div>
            <div className="payment-body">
              {!isPaymentActive ? (
                <>
                  <div className="qr-placeholder">
                    <i className="fas fa-qrcode" style={{fontSize: '100px', color: '#cbd5e1'}}></i>
                    <p className="mt-3">Click "Pay Now" to generate QR code</p>
                  </div>
                  <button
                    className="btn btn-success btn-lg btn-block"
                    onClick={handlePayment}
                  >
                    <i className="fas fa-credit-card mr-2"></i>
                    Pay Now
                  </button>
                </>
              ) : (
                <>
                  <div className="qr-container">
                    <QRCodeSVG
                      value={qrCodeData}
                      size={200}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  <div className="timer-container">
                    <p>QR Code expires in: <span className="timer">{timeLeft}s</span></p>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{width: `${(timeLeft/30)*100}%`}}
                      ></div>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary btn-lg btn-block"
                    onClick={handlePayNow}
                  >
                    <i className="fas fa-check-circle mr-2"></i>
                    I've Paid
                  </button>
                </>
              )}
            </div>
          </>
        ) : paymentStatus === 'success' && transactionData ? (
          <div className="payment-success">
            <div className="success-icon">
              <i className="fas fa-check"></i>
            </div>
            <h2>Payment Successful!</h2>
            <p>Your payment has been processed successfully.</p>

            <div className="transaction-details">
              {/* ... existing transaction details ... */}
              <div className="detail-item">
                <span className="detail-label">Transaction ID:</span>
                <span className="detail-value">{transactionData.id}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Timestamp:</span>
                <span className="detail-value">{transactionData.date} {transactionData.time}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Amount:</span>
                <span className="detail-value">{transactionData.amount}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Description:</span>
                <span className="detail-value">{transactionData.description}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Hash Code:</span>
                <span className="detail-value">***************</span>
              </div>
            </div>

            {/* QR Code Section for Verification - UPDATED */}
            <div className="qr-section">
              <h3>Verification QR Code</h3>
              <p>This QR code contains your payment verification hash and expires in {verificationTimeLeft} seconds.</p>

              <div className="qr-container">
                <QRCodeSVG
                  value={verificationQRData} // Use the verification QR data
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>

              <div className="timer-container">
                <p>Expires in: <span className="timer">{verificationTimeLeft}s</span></p>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${(verificationTimeLeft / 30) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={handleBackToDashboard}
            >
              Back to Dashboard
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PaymentPage;