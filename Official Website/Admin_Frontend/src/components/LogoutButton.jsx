import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const LogoutButton = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  // Get the API URL from environment variables
  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogout = async () => {
    try {
      // Call the backend logout endpoint (optional, if your backend supports it)
      await axios.post(
        `${API_URL}/auth/logout`,
        {},
        {
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );

      // Clear the token from cookies
      Cookies.remove("token", { path: "/" });

      // Update frontend authentication state
      setIsLoggedIn(false);

      toast.success("Logout successful!", {
        position: "top-right",
        autoClose: 2000,
      });

      // Redirect to the login page
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);

      // Show error message
      toast.error("Logout failed. Please try again.", {
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
