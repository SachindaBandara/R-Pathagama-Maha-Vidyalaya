import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />; // Redirect to login if not authenticated
  }

  return <Outlet />; // Render child routes if authenticated
};

export default ProtectedRoute;
