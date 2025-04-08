import FormModal from "../FormModal";
import { ImageIcon } from "lucide-react";

const EventForm = ({
  showForm,
  setShowForm,
  name,
  date,
  images,
  previewImages,
  handleImageChange,
  handleSubmit,
  editId
}) => {
  return (
    <FormModal
      showForm={showForm}
      setShowForm={setShowForm}
      title="Event"
      handleSubmit={handleSubmit}
      submitText="Create Event"
      formId={editId}
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Event Name
        </label>
        <div className="relative">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
            placeholder="Enter event name..."
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Event Date
        </label>
        <div className="relative">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Images
        </label>
        <div className="relative">
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
          />
          <ImageIcon
            className="absolute right-3 top-3 text-gray-400"
            size={18}
          />
        </div>
      </div>
      {previewImages.length > 0 && (
        <div className="mb-4">
          <p className="mb-2 text-gray-700">Image Preview:</p>
          <div className="flex space-x-2">
            {previewImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`preview-${index}`}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>
      )}
    </FormModal>
  );
};

export default EventForm;