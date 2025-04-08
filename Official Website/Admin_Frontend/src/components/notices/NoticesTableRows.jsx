import { motion } from "framer-motion";
import { Calendar, Edit, Link2, Trash2 } from "lucide-react";

const NoticesTableRows = ({ notices, handleEdit, handleDelete }) => {
  const dateOptions = { month: "long", day: "numeric", year: "numeric" };

  return notices.map((notice) => {
    const noticeDate = new Date(notice.deadline);
    const isPast = noticeDate < new Date();

    return (
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
            {noticeDate.toLocaleDateString("en-US", dateOptions)}
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
    );
  });
};

export default NoticesTableRows;