import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const EmptyState = ({ icon, title, message }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-12 bg-white rounded-sm border-2 border-dashed border-gray-200 text-center"
    >
      <div className="text-yellow-500 mb-4">
        {icon || <FileText size={48} strokeWidth={1.5} />}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {title || "No items found"}
      </h3>
      <p className="text-gray-500">{message || "Create your first item"}</p>
    </motion.div>
  );
};

export default EmptyState;