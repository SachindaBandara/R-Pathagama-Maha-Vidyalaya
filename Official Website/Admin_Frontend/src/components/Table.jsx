import { motion } from "framer-motion";

const Table = ({ columns, data, RowComponent, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-sm shadow-sm overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <motion.tr
              key={item._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="hover:bg-gray-50 transition-colors"
            >
              <RowComponent
                item={item}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;