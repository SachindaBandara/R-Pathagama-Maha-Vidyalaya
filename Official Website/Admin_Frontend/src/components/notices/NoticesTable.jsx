import { motion } from "framer-motion";
import { Calendar, Edit, Link2, Trash2 } from "lucide-react";

const NoticesTable = ({ filteredNotices, handleEdit, handleDelete }) => {
  const dateOptions = { month: "long", day: "numeric", year: "numeric" };

  return (
    <div className="bg-white rounded-sm shadow-sm overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Deadline
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              PDF Link
            </th>
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredNotices.map((notice) => (
            <motion.tr
              key={notice._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {notice.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-400" />
                  {new Date(notice.deadline).toLocaleDateString("en-US", dateOptions)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <a
                  href={notice.pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                >
                  <Link2 size={16} />
                  View PDF
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handleEdit(notice)}
                  className="text-yellow-600 hover:text-yellow-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(notice._id)}
                  className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NoticesTable;