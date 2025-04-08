import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CreateNotice from './pages/CreateNotice';
import Header from './components/Header';
import CreateEventPage from './pages/CreateEventPage';
import Login from './pages/Login';
import Signup from './pages/Signup'; 
import ForgotPassword from './pages/ForgotPassword';
import ProtectedRoute from './utils/ProtectedRoute';
import Cookies from 'js-cookie';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize state based on the presence of the token
    return !!Cookies.get('token');
  });

  useEffect(() => {
    // Function to check authentication status
    const checkAuth = () => {
      const token = Cookies.get('token');
      setIsLoggedIn(!!token);
    };

    // Run the check immediately on mount to handle refreshes
    checkAuth();

    // Listen for storage events (cross-tab updates)
    window.addEventListener('storage', checkAuth);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []); // Empty dependency array ensures this runs only on mount/unmount

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route 
          path="/" 
          element={isLoggedIn ? <Navigate to="/notice" replace /> : <Login setIsLoggedIn={setIsLoggedIn} />} 
        />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/notice" element={<CreateNotice />} />
          <Route path="/gallery" element={<CreateEventPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;