import { useState } from "react";
import { Outlet } from "react-router-dom";
import SearchLocation from "@/widgets/searchLocation";

export default function Layout() {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className="p-14 min-h-screen mx-auto bg-linear-to-br from-main/70 via-main/90 to-main">
      <div className="max-w-[1200px] mx-auto">
        <SearchLocation
          value={searchValue}
          onSearch={handleSearch}
          onChange={handleChange}
          placeholder="Search"
          className="bg-white/60 backdrop-blur-2xl shadow-lg"
        />
        <Outlet />
      </div>
    </div>
  );
}
