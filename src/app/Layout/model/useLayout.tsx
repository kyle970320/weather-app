import { useSearchAddress } from "@/feature/searchLocation";
import { useState } from "react";

export const useLayout = () => {
  const [search, setSearch] = useState("");
  const onChangeSearch = (value: string) => {
    setSearch(value);
  };
  const { addressesLocation, onSearchLoctaion } = useSearchAddress({
    query: search,
  });

  return {
    search,
    onChangeSearch,
    addressesLocation,
    onSearchLoctaion,
  };
};
