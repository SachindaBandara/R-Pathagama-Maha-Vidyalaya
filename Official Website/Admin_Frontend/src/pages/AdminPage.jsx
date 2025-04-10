import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminsHeader from "../components/admins/AdminsHeader";
import AdminsTable from "../components/admins/AdminsTable";
import AdminForm from "../components/admins/AdminForm";
import Pagination from "../components/Pagination";
import ConfirmDialog from "../components/ConfirmDialog";

const AdminPage = () => {
  const [admins, setAdmins] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false); 
  const [adminIdToDelete, setAdminIdToDelete] = useState(null); 
  const itemsPerPage = 5;
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/admins`);
      setAdmins(response.data.reverse());
    } catch (error) {
      console.error("Error fetching admins:", error);
      toast.error("Failed to fetch admins. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const adminData = { username, email, password };
      if (!password) {
        toast.error("Password is required for new admin.");
        return;
      }
      await axios.post(`${API_URL}/auth/signup`, adminData);
      toast.success("Admin created successfully!");
      fetchAdmins();
      setUsername("");
      setEmail("");
      setPassword("");
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting admin:", error.response || error.message);
      if (error.response?.data?.message?.includes("Maximum limit of 3 admins reached")) {
        toast.error("Maximum limit of 3 admins reached. Delete an existing admin to add a new one.");
      } else {
        toast.error("Failed to submit admin: " + (error.response?.data?.message || "Unknown error"));
      }
    }
  };

  // const handleDelete = async (id) => {
  //   if (window.confirm("Are you sure you want to delete this admin?")) {
  //     try {
  //       await axios.delete(`${API_URL}/auth/admins/${id}`);
  //       toast.success("Admin deleted successfully!");
  //       fetchAdmins();
  //     } catch (error) {
  //       console.error("Error deleting admin:", error);
  //       toast.error("Failed to delete admin. Please try again.");
  //     }
  //   }
  // };

  const handleDelete = (id) => {
    setAdminIdToDelete(id); // Set the admin ID to delete
    setShowConfirm(true); // Show the confirmation dialog
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/auth/admins/${adminIdToDelete}`);
      toast.success("Admin deleted successfully!");
      fetchAdmins();
    } catch (error) {
      console.error("Error deleting admin:", error.response || error.message);
      toast.error("Failed to delete admin: " + (error.response?.data?.message || "Please try again"));
    } finally {
      setShowConfirm(false); // Close the dialog
      setAdminIdToDelete(null); // Clear the ID
    }
  };

  const totalPages = Math.ceil(admins.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAdmins = admins.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-h-screen bg-white p-8 mt-20 font-inter">
      <div className="max-w-7xl mx-auto">
        <AdminsHeader setShowForm={setShowForm} />
        <AdminsTable
          filteredAdmins={currentAdmins}
          handleDelete={handleDelete}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
        <AdminForm
          showForm={showForm}
          setShowForm={setShowForm}
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />
        <ConfirmDialog
          isOpen={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={confirmDelete}
          message="Are you sure you want to delete this admin?"
        />
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </div>
  );
};

export default AdminPage;