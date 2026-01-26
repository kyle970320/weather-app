import { Outlet } from "react-router-dom";
import SearchLocation from "@/widgets/searchLocation";

export default function Layout() {
  return (
    <div className="p-14 min-h-screen mx-auto bg-linear-to-br from-main/70 via-main/90 to-main">
      <div className="max-w-[1200px] mx-auto">
        <SearchLocation
          placeholder="Search"
          className="bg-white/60 backdrop-blur-2xl shadow-lg"
        />
        <Outlet />
      </div>
    </div>
  );
}
