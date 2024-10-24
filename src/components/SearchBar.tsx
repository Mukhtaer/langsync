import React from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-blue-400 light:bg-white light:text-black light:border-gray-300 light:focus:ring-blue-500"
        placeholder="Search key or value..."
        aria-label="Search"
      />
    </div>
  );
};

export default SearchBar;
