import Table from "../Table";
import EventsTableRow from "./EventsTableRows";

const EventsTable = ({ filteredEvents, handleEdit, handleDelete }) => {
  const columns = [
    { key: "name", header: "Name" },
    { key: "postedDate", header: "Posted Date" },
    { key: "date", header: "Date" },
    { key: "images", header: "Images" },
    { key: "actions", header: "Actions" },
  ];

  return (
    <Table
      columns={columns}
      data={filteredEvents}
      RowComponent={({ item, onEdit, onDelete }) => (
        <EventsTableRow
          event={item}
          handleEdit={onEdit}
          handleDelete={onDelete}
        />
      )}
      onEdit={handleEdit}    // Pass edit handler to Table
      onDelete={handleDelete} // Pass delete handler to Table
    />
  );
};

export default EventsTable;