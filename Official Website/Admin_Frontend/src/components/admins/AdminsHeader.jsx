// components/admins/AdminsHeader.jsx
import PageHeader from "../PageHeader";

const AdminsHeader = ({ setShowForm }) => {
  return (
    <PageHeader
      title="Admin Management"
      subtitle="Manage your admins seamlessly"
      buttonText="Add Admin"
      onAddClick={() => setShowForm(true)}
    />
  );
};

export default AdminsHeader;