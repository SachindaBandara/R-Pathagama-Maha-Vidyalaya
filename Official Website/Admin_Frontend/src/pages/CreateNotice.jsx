import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoticeHeader from "../components/notices/NoticeHeader";
import NoticesSearchFilterBar from "../components/notices/NoticesSearchFilterBar";
import NoticesTable from "../components/notices/NoticesTable";
import EmptyState from "../components/EmptyState";
import Pagination from "../components/Pagination";
import NoticeForm from "../components/notices/NoticeForm";
import { FileText } from "lucide-react";

const CreateNotice = () => {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [pdfLink, setPdfLink] = useState("");
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchNotices();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  const fetchNotices = async () => {
    try {
      const response = await axios.get(`${API_URL}/notices`, {
        withCredentials: true,
      });
      setNotices(response.data.reverse());
    } catch (error) {
      console.error("Error fetching notices:", error);
      if (error.response?.status === 401) {
        toast.error("Please login again.", {
          onClose: () => navigate("/login"),
        });
      } else {
        toast.error("Failed to fetch notices. Please try again.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API_URL}/notices/${editId}`, {
          title,
          deadline,
          pdfLink,
        });
        toast.success("Notice updated successfully!");
      } else {
        await axios.post(`${API_URL}/notices`, {
          title,
          deadline,
          pdfLink,
        });
        toast.success("Notice created successfully!");
      }
      fetchNotices();
      setTitle("");
      setDeadline("");
      setPdfLink("");
      setEditId(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting notice:", error);
      toast.error("Failed to submit notice. Please try again.");
    }
  };

  const handleEdit = (notice) => {
    setTitle(notice.title);
    setDeadline(notice.deadline);
    setPdfLink(notice.pdfLink);
    setEditId(notice._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/notices/${id}`);
      toast.success("Notice deleted successfully!");
      fetchNotices();
    } catch (error) {
      console.error("Error deleting notice:", error);
      toast.error("Failed to delete notice. Please try again.");
    }
  };

  const filteredNotices = notices.filter((notice) => {
    if (
      searchTerm &&
      !notice.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    const noticeDeadline = new Date(notice.deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (filterStatus === "upcoming" && noticeDeadline < today) return false;
    if (filterStatus === "past" && noticeDeadline >= today) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotices = filteredNotices.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="min-h-screen bg-white p-8 mt-20 font-inter">
      <div className="max-w-7xl mx-auto">
        <NoticeHeader setShowForm={setShowForm} />
        <NoticesSearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
        {filteredNotices.length === 0 ? (
          <EmptyState
            icon={<FileText size={48} strokeWidth={1.5} />}
            title="No notices found"
            message="Create your first announcement"
          />
        ) : (
          <>
            <NoticesTable
              filteredNotices={currentNotices}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
        <NoticeForm
          showForm={showForm}
          setShowForm={setShowForm}
          title={title}
          setTitle={setTitle}
          deadline={deadline}
          setDeadline={setDeadline}
          pdfLink={pdfLink}
          setPdfLink={setPdfLink}
          handleSubmit={handleSubmit}
          editId={editId}
        />
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </div>
  );
};

export default CreateNotice;