import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../utils/slices/authSlice';
import { toast } from 'react-toastify';

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(result)) {
      toast.success('Logout successful!', {
        position: 'top-right',
        autoClose: 2000,
      });
      navigate('/', { replace: true });
    } else {
      toast.error('Logout failed. Please try again.', {
        position: 'top-right',
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