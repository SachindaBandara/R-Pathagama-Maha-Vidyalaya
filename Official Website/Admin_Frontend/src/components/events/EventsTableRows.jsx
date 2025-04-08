import { Calendar, Edit, Trash2 } from "lucide-react";

const EventsTableRows = ({ event, handleEdit, handleDelete }) => {
  const dateOptions = { month: "long", day: "numeric", year: "numeric" };
  const eventDate = new Date(event.date);
  const postedDate = new Date(notice.postedDate);

  return (
    <>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {event.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-400" />
          {postedDate.toLocaleDateString("en-US", dateOptions)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-400" />
          {eventDate.toLocaleDateString("en-US", dateOptions)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <div className="flex items-center gap-2">
          {event.images.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={`event-${index}`}
              className="w-12 h-12 object-cover rounded"
            />
          ))}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
        <button
          onClick={() => handleEdit(event)}
          className="text-yellow-600 hover:text-yellow-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <Edit size={18} />
        </button>
        <button
          onClick={() => handleDelete(event._id)}
          className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </>
  );
};

export default EventsTableRows;