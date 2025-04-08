import FormModal from "../FormModal";
import { FileText, Link2 } from "lucide-react";

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
    <FormModal
      showForm={showForm}
      setShowForm={setShowForm}
      title="Notice"
      handleSubmit={handleSubmit}
      submitText="Create Notice"
      formId={editId}
    >
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
    </FormModal>
  );
};

export default NoticeForm;