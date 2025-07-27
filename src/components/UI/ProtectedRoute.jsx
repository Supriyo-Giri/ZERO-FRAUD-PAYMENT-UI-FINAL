import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ role, children }) => {
  // This will be implemented with proper authentication logic later
  // For now, we'll just allow access for demo purposes
  const isAuthenticated = true; // Replace with actual auth check
  const userRole = role; // Replace with actual user role

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // if (role && userRole !== role) {
  //   return <Navigate to="/" />;
  // }

  return children;
};

export default ProtectedRoute;