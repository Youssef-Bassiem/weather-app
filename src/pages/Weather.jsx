import { useState } from "react";
import Details from "../components/ui/Details";
import { AutoComplete } from "@/components/ui/AutoComplete";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useSuggestions } from "@/hooks/useSuggestions";
import { useWeather } from "@/hooks/useWeather";
import { weatherImage } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const Weather = () => {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const { suggestions, isPending: isLoadingSearch } = useSuggestions(city);
  const { weatherData, isLoading: isLoadingSelected } =
    useWeather(selectedCity);

  const weatherImageSrc = weatherImage(weatherData?.weather[0]?.icon);

  return (
    <main className="no-scrollbar mt-14 flex h-5/6 w-[35rem] flex-col items-center justify-between overflow-y-scroll rounded-xl bg-[#161a2b] py-12 shadow-[0px_0px_8px_black] max-sm:h-3/4 max-sm:w-96">
      <AutoComplete
        class
        emptyMessage="No results found."
        selectedValue={selectedCity}
        onSelectedValueChange={setSelectedCity}
        searchValue={city}
        onSearchValueChange={setCity}
        items={suggestions ?? []}
        isLoading={isLoadingSearch}
      />

      {isLoadingSelected ? (
        <Skeleton className="mt-4 flex h-96 w-80 place-content-center place-items-center bg-[#2b304c] opacity-80">
          <LoadingSpinner className="h-12 w-12 text-black opacity-80" />
        </Skeleton>
      ) : weatherData ? (
        <div className="flex h-4/5 w-4/5 flex-col items-center justify-between max-sm:w-11/12">
          <img
            className="max-sm:h-30 max-sm:w-30 h-40 w-40"
            src={weatherImageSrc}
            alt="weatherImage"
          />
          <div className="flex flex-col items-center justify-center gap-4 text-white">
            <h1 className="text-6xl font-semibold">
              {weatherData.main.temp.toFixed(1)}&deg;C
            </h1>
            <h2 className="text-2xl font-medium max-sm:text-lg">
              {selectedCity.label}
            </h2>
          </div>
          <div className="flex w-full justify-evenly text-white">
            <Details
              text={"humidity"}
              value={weatherData.main.humidity}
              unit={"%"}
            />
            <Details
              text={"wind"}
              value={weatherData.wind.speed.toFixed(1)}
              unit={" " + "Km/h"}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </main>
  );
};

export default Weather;
