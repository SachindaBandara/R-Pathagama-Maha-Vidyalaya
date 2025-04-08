import { motion } from "framer-motion";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="flex justify-end items-center gap-4 mt-8">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50"
      >
        Previous
      </motion.button>
      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50"
      >
        Next
      </motion.button>
    </div>
  );
};

export default Pagination;