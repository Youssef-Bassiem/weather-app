import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";

import { getGeo } from "../lib/apiWeather";
export function useSuggestions(city) {
  const debouncedCity = useDebounce(city, 300);
  const { data: suggestions, isPending } = useQuery({
    queryKey: ["suggestions", debouncedCity],
    queryFn: () => getGeo(debouncedCity),
    enabled: Boolean(debouncedCity),
  });

  return { suggestions, isPending };
}
