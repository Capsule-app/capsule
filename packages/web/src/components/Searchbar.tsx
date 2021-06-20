import React from "react";
import { Search } from "react-ionicons";

export const Searchbar: React.FC = () => {
  return (
    <div className="flex items-center h-6.5">
      <div className="bg-gray-800 rounded-l-40 h-full flex-center pl-3 pr-2">
        <Search color="gray" />
      </div>
      <input
        placeholder="Search"
        className="bg-gray-800 placeholder-gray-500 text-gray-100 rounded-r-40 w-full h-full focus:outline-none"
      />
    </div>
  );
};
