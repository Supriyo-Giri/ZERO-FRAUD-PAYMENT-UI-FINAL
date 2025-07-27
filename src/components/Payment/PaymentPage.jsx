// src/components/Payment/PaymentPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { QRCodeSVG } from 'qrcode.react';

const PaymentPage = ({ onPaymentSuccess }) => { // Accept onPaymentSuccess prop
  const { eventId } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [transactionData, setTransactionData] = useState(null);
  const [qrCodeData, setQrCodeData] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPaymentActive, setIsPaymentActive] = useState(false);

  // Generate initial QR code data
  useEffect(() => {
    generateQRCode();
  }, []);

  // Handle QR code regeneration every 30 seconds
  useEffect(() => {
    let timer;
    if (isPaymentActive) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === 1) {
            generateQRCode();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isPaymentActive]);

  const generateQRCode = () => {
    const newQRData = `EVENT_PAYMENT:${eventId}:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`;
    setQrCodeData(newQRData);
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
      amount: '₹450.00', // This should ideally come from the event data
      status: 'Success',
      hashCode: `********`
    };

    setTransactionData(newTransaction);
    setPaymentStatus('success');
    setIsPaymentActive(false);

    // Call the function passed from the parent to update history
    if (onPaymentSuccess) {
      onPaymentSuccess(newTransaction);
    }

    console.log('Payment successful:', newTransaction);
  };

  const handleBackToDashboard = () => {
    // Navigate back to the student dashboard
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
                <span className="detail-value">{transactionData.hashCode}</span>
              </div>
            </div>

            {/* QR Code Section for Verification */}
            <div className="qr-section">
              <h3>Verification QR Code</h3>
              <p>This QR code contains your payment verification hash and expires in {timeLeft} seconds.</p>

              <div className="qr-container">
                <QRCodeSVG
                  value={`PAYMENT_VERIFIED:${transactionData.hashCode}:${Date.now()}`}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>

              <div className="timer-container">
                <p>Expires in: <span className="timer">{timeLeft}s</span></p>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${(timeLeft / 30) * 100}%` }}
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