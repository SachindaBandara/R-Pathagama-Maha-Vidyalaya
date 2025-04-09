import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/" replace />;
  }

  // Render the child routes if the user is authenticated
  return <Outlet />;
};

export default ProtectedRoute;