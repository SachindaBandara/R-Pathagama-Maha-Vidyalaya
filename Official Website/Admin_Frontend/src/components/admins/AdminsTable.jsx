import React from "react";
import Table from "../Table";
import AdminsTableRows from "./AdminsTableRows";

const AdminsTable = ({ filteredAdmins, handleDelete }) => {
  const columns = [
    { key: "username", header: "Username" },
    { key: "email", header: "Email" },
    { key: "actions", header: "Actions" },
  ];

  // Ensure filteredAdmins is an array, default to empty array if undefined
  const tableData = Array.isArray(filteredAdmins) ? filteredAdmins : [];

  return (
    <Table
      columns={columns}
      data={tableData} // Use the validated tableData
      RowComponent={({ item, onDelete }) => (
        <AdminsTableRows admin={item} handleDelete={onDelete} />
      )}
      onDelete={handleDelete}
    />
  );
};

export default AdminsTable;