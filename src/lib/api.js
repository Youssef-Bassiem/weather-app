import axios from "axios";

const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7842948c62msh64be6482a274037p14d610jsn4e30d1dc7dd3",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};
const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

export async function getGeo(city) {
  return axios
    .get(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${city}`, {
      ...geoApiOptions,
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((err) => err);
}

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const WEATHER_API_KEY = "87b4eadd450ee8f3f2ab5f63469b1be9";

export async function getWeather(lat, lon) {
  return axios
    .get(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => err);
}
