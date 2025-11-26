import { useState } from "react";
import { Input } from "@/components/ui/input";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full mb-1 md:mb-2">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search vestr"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-3 md:pl-5 pr-2 md:pr-4 rounded-lg md:rounded-2xl text-sm md:text-base"
        />
      </div>
    </form>
  );
}

export default SearchBar;
