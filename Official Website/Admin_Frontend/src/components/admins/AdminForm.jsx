import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import FormModal from "../FormModal";
import { User, Mail, Lock } from "lucide-react"; // Icons for username, email, and password

const AdminForm = ({
  showForm,
  setShowForm,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormModal
      showForm={showForm}
      setShowForm={setShowForm}
      title="Create Admin" // Consistent title
      handleSubmit={handleSubmit}
      submitText="Create Admin" // Consistent button text
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Username
        </label>
        <div className="relative">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
            placeholder="Enter username..."
            required
          />
          <User className="absolute right-3 top-3 text-gray-400" size={18} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
            placeholder="Enter email..."
            required
          />
          <Mail className="absolute right-3 top-3 text-gray-400" size={18} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
            placeholder="Enter password..."
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400"
          >
            {showPassword ? (
              <FaEyeSlash size={18} />
            ) : (
              <FaEye size={18} />
            )}
          </button>
        </div>
      </div>
    </FormModal>
  );
};

export default AdminForm;