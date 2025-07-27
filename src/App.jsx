// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import PaymentPage from './components/Payment/PaymentPage';
import ProtectedRoute from './components/UI/ProtectedRoute';
import './App.css';

// Dummy initial payment history
const initialPaymentHistory = [];

function App() {
  // State to hold payment history
  const [paymentHistory, setPaymentHistory] = useState(initialPaymentHistory);
  const [userName, setUserName] = useState("John Doe"); // Example user name

  // Function to add a new transaction to the history
  const handlePaymentSuccess = (newTransaction) => {
    setPaymentHistory(prevHistory => [newTransaction, ...prevHistory]);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/student-dashboard" element={
            <ProtectedRoute role="student">
              {/* Pass paymentHistory and userName as props */}
              <StudentDashboard paymentHistory={paymentHistory} userName={userName} />
            </ProtectedRoute>
          } />
          <Route path="/payment/:eventId" element={
             // Pass the handlePaymentSuccess function as a prop
            <PaymentPage onPaymentSuccess={handlePaymentSuccess} />
          } />
          <Route path="/" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;