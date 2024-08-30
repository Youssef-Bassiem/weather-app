import { useQuery } from "@tanstack/react-query";
import { getWeather } from "./../lib/api";

export function useWeather(selectedCity) {
  console.log("Refetching weather data for", selectedCity);
  const { data: weatherData, isLoading } = useQuery({
    queryKey: ["weather", selectedCity.label],
    queryFn: () => getWeather(selectedCity.lat, selectedCity.lon),
    enabled: Boolean(selectedCity.label),
  });
  return { weatherData, isLoading };
}