import { Calendar } from "lucide-react";

const SearchFilterBar = ({ searchTerm, setSearchTerm, filterMonth, setFilterMonth }) => {
  return (
    <div className="mb-8 flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
      <select
        value={filterMonth}
        onChange={(e) => setFilterMonth(e.target.value)}
        className="px-4 py-3 bg-white rounded-xl border border-gray-200 shadow-sm"
      >
        <option value="all">All</option>
        {[...Array(12).keys()].map((month) => (
          <option key={month} value={month}>
            {new Date(0, month).toLocaleString('default', { month: 'long' })}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilterBar;