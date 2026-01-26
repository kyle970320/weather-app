import { useState } from "react";

export const useLayout = () => {
  const [search, setSearch] = useState("");
  const onChangeSearch = (value: string) => {
    setSearch(value);
  };
  return { search, onChangeSearch };
};
