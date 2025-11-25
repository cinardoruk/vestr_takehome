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
    <form onSubmit={handleSearch} className="relative w-full mb-2">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search vestr"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-5 pr-4 rounded-2xl"
        />
      </div>
    </form>
  );
}

export default SearchBar;
