import { useSearchAddress } from "@/feature/searchLocation";
import { useState } from "react";

export const useLayout = () => {
  const [search, setSearch] = useState("");
  const onChangeSearch = (value: string) => {
    setSearch(value);
  };
  const { addressesLocation, handleSearchLocation } = useSearchAddress({
    query: search,
  });

  return {
    search,
    onChangeSearch,
    addressesLocation,
    handleSearchLocation,
  };
};
