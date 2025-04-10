import React, { useState, useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";
import ResetPassword from "./pages/ResetPassword";

// Lazy load components to split the code
const CreateNotice = lazy(() => import("./pages/CreateNotice"));
const Header = lazy(() => import("./components/Header"));
const CreateEventPage = lazy(() => import("./pages/CreateEventPage"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ProtectedRoute = lazy(() => import("./utils/ProtectedRoute"));

const App = () => {
  // Initialize isLoggedIn based on the presence of the token in cookies
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!Cookies.get("token"));

  useEffect(() => {
    // Function to check authentication status
    const checkAuth = () => {
      const token = Cookies.get("token");
      setIsLoggedIn(!!token); // Update isLoggedIn state based on token presence
    };

    // Run the check immediately on mount to handle refreshes
    checkAuth();

    // Listen for storage events (cross-tab updates)
    window.addEventListener("storage", checkAuth);

    // Cleanup the event listener on unmount
    return () => window.removeEventListener("storage", checkAuth);
    
  }, []); // Empty dependency array ensures this runs only on mount/unmount

  return (
    <Router>
      <Suspense>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        {/* Root route */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/notice" replace />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />

        {/* Public routes */}
        <Route
          path="/signup"
          element={<Signup setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/notice" element={<CreateNotice />} />
          <Route path="/gallery" element={<CreateEventPage />} />
        </Route>

        {/* Add fallback route for authenticated users */}
        <Route 
          path="*" 
          element={isLoggedIn ? <Navigate to="/notice" replace /> : <Navigate to="/" replace />} 
        />
      </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
