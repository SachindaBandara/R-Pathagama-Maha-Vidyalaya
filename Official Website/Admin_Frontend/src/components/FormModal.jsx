// Components/FormModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const FormModal = ({
  showForm,
  setShowForm,
  title,
  children,
  handleSubmit,
  submitText,
  cancelText = "Cancel",
  formId = null
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
                {formId ? `Edit ${title}` : `Create New ${title}`}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {children}
              <div className="flex justify-end gap-3 pt-6">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 text-gray-600 bg-gray-200 hover:bg-gray-400 hover:text-white font-medium rounded-xl"
                >
                  {cancelText}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-5 py-2.5 bg-red-900 hover:bg-red-950 text-white font-medium rounded-xl"
                >
                  {formId ? `Save ${title}` : submitText}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormModal;