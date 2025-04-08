import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EventHeader from "../components/events/EventHeader";
import SearchFilterBar from "../components/events/SearchFilterBar";
import EventsTable from "../components/events/EventsTable";
import EmptyState from "../components/events/EmptyState";
import Pagination from "../components/events/Pagination";
import EventForm from "../components/events/EventForm";

const CreateEventPage = () => {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMonth, setFilterMonth] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterMonth]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/events`);
      setEvents(response.data.reverse());
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to fetch events. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("date", date);
      images.forEach((image) => formData.append("images", image));

      if (editId) {
        await axios.put(`${API_URL}/events/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Event updated successfully!");
      } else {
        await axios.post(`${API_URL}/events`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Event created successfully!");
      }

      fetchEvents();
      setName("");
      setDate("");
      setImages([]);
      setPreviewImages([]);
      setEditId(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting event:", error);
      toast.error("Failed to submit event. Please try again.");
    }
  };

  const handleEdit = (event) => {
    setName(event.name);
    setDate(event.date.split("T")[0]);
    setPreviewImages(event.images.map((img) => img.url));
    setEditId(event._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/events/${id}`);
      toast.success("Event deleted successfully!");
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event. Please try again.");
    }
  };

  const filteredEvents = events.filter((event) => {
    if (searchTerm && !event.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (filterMonth !== "all") {
      const eventMonth = new Date(event.date).getMonth();
      if (eventMonth !== parseInt(filterMonth)) {
        return false;
      }
    }
    return true;
  });

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-h-screen bg-white p-8 mt-20 font-inter">
      <div className="max-w-7xl mx-auto">
        <EventHeader setShowForm={setShowForm} />
        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterMonth={filterMonth}
          setFilterMonth={setFilterMonth}
        />
        {filteredEvents.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <EventsTable
              filteredEvents={currentEvents}
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
        <EventForm
          showForm={showForm}
          setShowForm={setShowForm}
          name={name}
          setName={setName}
          date={date}
          setDate={setDate}
          images={images}
          setImages={setImages}
          previewImages={previewImages}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
          editId={editId}
        />
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </div>
  );
};

export default CreateEventPage;