import { Trash2 } from "lucide-react";

const AdminsTableRows = ({ admin, handleDelete }) => {
  return (
    <>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {admin.username}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {admin.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
        <button
          onClick={() => handleDelete(admin._id)}
          className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </>
  );
};

export default AdminsTableRows;