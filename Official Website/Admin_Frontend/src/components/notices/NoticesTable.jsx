import NoticesTableRows from "./NoticesTableRows";

const NoticesTable = ({ filteredNotices, handleEdit, handleDelete }) => {
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
          <NoticesTableRows
            notices={filteredNotices}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </tbody>
      </table>
    </div>
  );
};

export default NoticesTable;