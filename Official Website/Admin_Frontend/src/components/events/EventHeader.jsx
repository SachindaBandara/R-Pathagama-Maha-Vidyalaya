import PageHeader from "../PageHeader";

const EventHeader = ({ setShowForm }) => {
  return (
    <PageHeader
      title="Event Management"
      subtitle="Manage your events seamlessly"
      buttonText="Add Event"
      onAddClick={() => setShowForm(true)}
    />
  );
};

export default EventHeader;