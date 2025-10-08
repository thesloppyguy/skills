"use client";

import { SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const handleSearch = () => {
  };
  return (
    <div className="flex items-center space-x-4">
      <div className="flex-1 relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="What are you looking for?"
          className="w-full pl-10"
        />
      </div>
      <Button
        size="sm"
        className="bg-blue-900 hover:bg-blue-800"
        onClick={handleSearch}
      >
        ASTRA AI
      </Button>
    </div>
  );
};

export default SearchBar;
