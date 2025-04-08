import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Link2 } from "lucide-react";

const NoticeForm = ({
  showForm,
  setShowForm,
  title,
  deadline,
  pdfLink,
  setTitle,
  setDeadline,
  setPdfLink,
  handleSubmit,
  editId
}) => {
  return (
    <AnimatePresence>
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {editId ? "Edit Notice" : "Create New Notice"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                    placeholder="Notice title..."
                    required
                  />
                  <FileText className="absolute right-3 top-3 text-gray-400" size={18} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deadline
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PDF Link
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={pdfLink}
                    onChange={(e) => setPdfLink(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                    placeholder="https://example.com/document.pdf"
                    required
                  />
                  <Link2 className="absolute right-3 top-3 text-gray-400" size={18} />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-6">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 text-gray-600 bg-gray-200 hover:bg-gray-400 hover:text-white font-medium rounded-xl"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-5 py-2.5 bg-red-900 hover:bg-red-950 text-white font-medium rounded-xl"
                >
                  {editId ? "Save Changes" : "Create Notice"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NoticeForm;