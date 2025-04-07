import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const LogoutButton = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the backend logout endpoint
      await axios.post('http://localhost:5000/api/auth/logout', {}, {
        withCredentials: true
      });

      // Clear frontend authentication state
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      
      // Show success message
      toast.success('Logout successful!', {
        position: "top-right",
        autoClose: 2000,
      });

      // Redirect to login page
      navigate('/', { replace: true });

    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed. Please try again.', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-900 text-white px-4 py-2 rounded hover:bg-yellow-custom hover:text-red-custom transition duration-300"
    >
      Logout
    </button>
  );
};

export default LogoutButton;