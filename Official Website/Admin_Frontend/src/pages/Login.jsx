import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../utils/slices/authSlice';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberUsername, setRememberUsername] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isLoggedIn } = useSelector((state) => state.auth);

  // Load saved username from localStorage on component mount
  useEffect(() => {
    const savedUsername = localStorage.getItem('rememberedUsername');
    if (savedUsername) {
      setFormData((prev) => ({ ...prev, username: savedUsername }));
      setRememberUsername(true);
    }
  }, []);

  // Handle errors with toast
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: 'top-right',
        autoClose: 3000,
        onClose: () => dispatch(clearError()),
      });
    }
  }, [error, dispatch]);

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/notice', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      toast.error('Please fill in all fields.', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }

    // Save username to localStorage if "Remember Username" is checked
    if (rememberUsername) {
      localStorage.setItem('rememberedUsername', formData.username);
    } else {
      localStorage.removeItem('rememberedUsername');
    }

    dispatch(loginUser(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-inter">
      <ToastContainer />

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>
        <p className="text-sm text-gray-500 text-center">
          Enter your credentials to access the dashboard
        </p>

        <form onSubmit={handleLogin} className="mt-6">
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-red-900"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-red-900"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-red-800"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberUsername"
                  checked={rememberUsername}
                  onChange={(e) => setRememberUsername(e.target.checked)}
                  className="h-4 w-4 text-red-900 focus:ring-red-900 border-gray-300 rounded"
                />
                <label
                  htmlFor="rememberUsername"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember Username
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-sm text-red-900 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-red-900 text-white py-2 rounded hover:bg-red-950 transition duration-300 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          Don't have an account?
          <Link to="/signup" className="text-red-900 hover:underline ml-1">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;