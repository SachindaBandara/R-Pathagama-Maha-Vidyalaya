import { Calendar } from "lucide-react";

const SearchFilterBar = ({
  placeholder,
  searchTerm,
  onSearchChange,
  filterOptions,
  filterValue,
  onFilterChange
}) => {
  return (
    <div className="mb-8 flex flex-col sm:flex-row gap-4">
      {/* Search Input */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-1/2 pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 shadow-sm"
        />
        <svg
          className="absolute left-3 top-3.5 text-gray-400 h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Filter Select */}
      <select
        value={filterValue}
        onChange={(e) => onFilterChange(e.target.value)}
        className="px-4 py-3 bg-white rounded-xl border border-gray-200 shadow-sm"
      >
        {filterOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilterBar;