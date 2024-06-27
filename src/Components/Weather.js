import { useEffect, useRef, useState } from "react";
import "./Weather.css";
import Details from "./Details";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const WEATHER_API_KEY = "87b4eadd450ee8f3f2ab5f63469b1be9";
const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7842948c62msh64be6482a274037p14d610jsn4e30d1dc7dd3",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

const CssTextField = styled(TextField)({
  "& .MuiInput-underline:after": {
    borderColor: "red",
  },
});
const Weather = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const inputRef = useRef(null);

  const changeIcon = () => {
    switch (data.weather[0].icon) {
      case "01d":
      case "01n":
        return "Assets/clear.png";

      case "02d":
      case "02n":
        return "Assets/cloud.png";

      case "03d":
      case "03n":
      case "04d":
      case "04n":
        return "Assets/drizzle.png";

      case "09d":
      case "09n":
      case "10d":
      case "10n":
        return "Assets/rain.png";

      case "13d":
      case "13n":
        return "Assets/snow.png";

      default:
        return "Assets/cloud.png";
    }
  };

  useEffect(() => {
    if (!city) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    function fetchGeo() {
      axios
        .get(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${city}`, {
          ...geoApiOptions,
          signal: controller.signal,
        })
        .then((response) => {
          setSuggestions(response.data.data);
        })
        .catch((err) => err.name !== "CanceledError" && console.error(err));
    }
    const timer = setTimeout(() => fetchGeo(), 800);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [city, data]);

  useEffect(() => {
    if (!selectedCity) return;
    setIsLoading(true);
    function fetchWeather(lat, lon) {
      axios
        .get(
          `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        )
        .then((response) => {
          setData({ ...response.data });
        })
        .catch((err) => console.error(err.message))
        .finally(() => setIsLoading(false));
    }
    fetchWeather(selectedCity.lat, selectedCity.lon);
  }, [selectedCity]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="container">
      <div className="con">
        <Autocomplete
          className="Async"
          freeSolo
          onChange={(_, value) => {
            if (value !== null) {
              setSelectedCity({
                label: value.label,
                lat: value.value.split(" ")[0],
                lon: value.value.split(" ")[1],
              });
            }
          }}
          id="combo-box-demo"
          options={suggestions.map((el) => {
            return {
              label: `${el.name}`,
              value: `${el.latitude} ${el.longitude}`,
            };
          })}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <CssTextField
              inputRef={inputRef}
              onChange={(e) => setCity(e.target.value)}
              {...params}
            />
          )}
        />
      </div>

      {isLoading ? (
        "Loading..."
      ) : data ? (
        <>
          <img className="tmep-img" src={changeIcon()} alt="" />
          <div className="temp-city">
            <h1>{data.main.temp.toFixed(1)}&deg;C</h1>
            <h2>{selectedCity.label}</h2>
          </div>
          <div className="data">
            <Details text={"humidity"} value={data.main.humidity} unit={"%"} />
            <Details
              text={"wind"}
              value={data.wind.speed.toFixed(1)}
              unit={"Km/h"}
            />
          </div>
        </>
      ) : selectedCity ? (
        <div className="not-found">Enter valid city</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Weather;
