import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../src/utils/slices/authSlice';

// Lazy load components
const CreateNotice = lazy(() => import('./pages/CreateNotice'));
const CreateEventPage = lazy(() => import('./pages/CreateEventPage'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const AdminPage = lazy(() => import('./pages/Adminpage'));
const ProtectedRoute = lazy(() => import('./utils/ProtectedRoute'));

const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, loading } = useSelector((state) => state.auth);

  // Check authentication status on mount
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Show loading state while checking auth
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Root route */}
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/notice" replace /> : <Login />}
          />

          {/* Public routes */}

          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
            <Route path="/notice" element={<CreateNotice />} />
            <Route path="/gallery" element={<CreateEventPage />} />
            <Route path="/admins" element={<AdminPage />} />
          </Route>

          {/* Fallback route */}
          <Route
            path="*"
            element={
              isLoggedIn ? <Navigate to="/notice" replace /> : <Navigate to="/" replace />
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;