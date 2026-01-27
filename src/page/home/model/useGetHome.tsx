import { getGeo } from "@/entity/location";
import { useSearchWeather } from "@/feature/weather";
import { getCurrentLocation } from "@/shared/utils/currentLocation";
import { useEffect, useState } from "react";

export default function useGetHome() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    addressName?: string;
  } | null>(null);

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const position = await getCurrentLocation();
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const address = await getGeo({
          latitude,
          longitude,
        });
        console.log({ address });
        setLocation({
          latitude,
          longitude,
          addressName: address[0]?.addressName,
        });
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, []);
  console.log(location);

  const { data: weatherData } = useSearchWeather({
    latitude: location?.latitude ?? null,
    longitude: location?.longitude ?? null,
  });

  return {
    location,
    data: weatherData,
    isWeatherLoading: isLoading,
    weatherError: error,
  };
}
