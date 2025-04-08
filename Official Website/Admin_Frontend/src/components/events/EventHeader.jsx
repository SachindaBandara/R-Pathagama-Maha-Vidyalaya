import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const EventHeader = ({ setShowForm }) => {
  return (
    <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-red-800">
          Event Management
        </h1>
        <p className="text-gray-600">Manage your events seamlessly</p>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowForm(true)}
        className="flex items-center gap-2 px-5 py-3 bg-red-900 hover:bg-red-950 text-white font-medium rounded-xl shadow-lg transition-all"
      >
        <Plus size={20} />
        Add Event
      </motion.button>
    </div>
  );
};

export default EventHeader;