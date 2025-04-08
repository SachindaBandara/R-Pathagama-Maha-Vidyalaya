import SearchFilterBar from "../SearchFilterBar";

const NoticesSearchFilterBar = ({ searchTerm, setSearchTerm, filterStatus, setFilterStatus }) => {
  const statusOptions = [
    { value: "all", label: "All" },
    { value: "upcoming", label: "Upcoming" },
    { value: "past", label: "Past" }
  ];

  return (
    <SearchFilterBar
      placeholder="Search notices..."
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      filterOptions={statusOptions}
      filterValue={filterStatus}
      onFilterChange={setFilterStatus}
    />
  );
};

export default NoticesSearchFilterBar;