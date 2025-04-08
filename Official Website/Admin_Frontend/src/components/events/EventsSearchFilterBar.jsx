import SearchFilterBar from "../SearchFilterBar";

const EventsSearchFilterBar = ({ searchTerm, setSearchTerm, filterMonth, setFilterMonth }) => {
  const monthOptions = [
    { value: "all", label: "All" },
    ...[...Array(12).keys()].map((month) => ({
      value: month.toString(),
      label: new Date(0, month).toLocaleString('default', { month: 'long' })
    }))
  ];

  return (
    <SearchFilterBar
      placeholder="Search events..."
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      filterOptions={monthOptions}
      filterValue={filterMonth}
      onFilterChange={setFilterMonth}
    />
  );
};

export default EventsSearchFilterBar;