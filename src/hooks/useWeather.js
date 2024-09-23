import { useQuery } from "@tanstack/react-query";
import { getWeather } from "../lib/apiWeather";

export function useWeather(selectedCity) {
  const { data: weatherData, isLoading } = useQuery({
    queryKey: ["weather", selectedCity.label],
    queryFn: () => getWeather(selectedCity.lat, selectedCity.lon),
    enabled: Boolean(selectedCity?.label),
  });
  return { weatherData, isLoading };
}
