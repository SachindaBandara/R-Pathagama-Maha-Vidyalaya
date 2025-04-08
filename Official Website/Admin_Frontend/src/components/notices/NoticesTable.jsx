import Table from "../Table";
import NoticesTableRow from "./NoticesTableRows";

const NoticesTable = ({ filteredNotices, handleEdit, handleDelete }) => {
  const columns = [
    { key: "title", header: "Title" },
    { key: "deadline", header: "Deadline" },
    { key: "pdfLink", header: "PDF Link" },
    { key: "actions", header: "Actions" },
  ];

  return (
    <Table
      columns={columns}
      data={filteredNotices}
      RowComponent={({ item, onEdit, onDelete }) => (
        <NoticesTableRow
          notice={item}
          handleEdit={onEdit}
          handleDelete={onDelete}
        />
      )}
    />
  );
};

export default NoticesTable;