// Components/NoticeHeader.jsx
import PageHeader from "../PageHeader";

const NoticeHeader = ({ setShowForm }) => {
  return (
    <PageHeader
      title="Notice Management"
      subtitle="Manage academic announcements"
      buttonText="Add Notice"
      onAddClick={() => setShowForm(true)}
    />
  );
};

export default NoticeHeader;