import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const PageHeader = ({ 
  title, 
  subtitle, 
  buttonText,
  onAddClick 
}) => {
  return (
    <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-red-800">
          {title}
        </h1>
        <p className="text-gray-600">{subtitle}</p>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAddClick}
        className="flex items-center gap-2 px-5 py-3 bg-red-900 hover:bg-red-950 text-white font-medium rounded-xl shadow-lg transition-all"
      >
        {buttonText}
        <Plus size={20} />
      </motion.button>
    </div>
  );
};

export default PageHeader;