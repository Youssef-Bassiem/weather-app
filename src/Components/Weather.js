import { useCallback, useEffect, useRef, useState } from "react";
import IconSearch from "./IconSearch";
import "./Weather.css";
import Details from "./Details";
import axios from "axios";

let prevState;

const Weather = () => {
  const apiKey = "efe78cc261a450fd157a5acdd629a2b3";
  const [city, setCity] = useState("Cairo");
  const [data, setData] = useState(null);
  const inputRef = useRef(null);

  const searchApi = useCallback((c) => {
    if (c !== prevState) {
      prevState = c;
      let url =
        `https://api.openweathermap.org/data/2.5/weather?q=${c}&appid=` +
        apiKey;
      axios
        .get(url)
        .then((response) => {
          setData({ ...response.data });
        })
        .catch(() => setData(null));
    }
  }, []);

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
        return "";
    }
  };

  useEffect(() => {
    searchApi("Cairo");
    inputRef.current.focus();
  }, [searchApi]);

  return (
    <div className="container">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          ref={inputRef}
          placeholder="Search"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={() => searchApi(city)}>
          <IconSearch />
        </button>
      </form>
      {data ? (
        <>
          <img className="tmep-img" src={changeIcon()} alt="" />
          <div className="temp-city">
            <h1>{(data.main.temp - 273.15).toFixed(1)}&deg;C</h1>
            <h2>{data.name}</h2>
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
      ) : (
        <div className="not-found">Enter valid city</div>
      )}
    </div>
  );
};

export default Weather;
