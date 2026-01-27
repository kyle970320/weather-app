import { useSearchAddress } from "@/feature/searchLocation";

export const useLayout = () => {
  const { addressesLocation, onSearchLoctaion } = useSearchAddress({
    query: "",
  });

  return {
    addressesLocation,
    onSearchLoctaion,
  };
};
