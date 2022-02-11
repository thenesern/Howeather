// Packages and Dependencies
import axios from "axios";
import { useState, useEffect } from "react";
// Styles
import WeatherCard from "./UI/Card/Card.js";

function CardAPI(props) {
  const key = "165646a7eea43e8eae8c831b8da3d125";
  const [weatherDeg, setWeatherDeg] = useState("Loading");
  const [weatherIcon, setWeatherIcon] = useState("Loading");
  const [weatherCity, setWeatherCity] = useState("Loading");
  const [weatherDes, setWeatherDes] = useState("Loading");

  let city = props.weatherCity;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=en`
      )
      .then((res) => {
        setWeatherCity(res.data.name);
        setWeatherIcon(res.data.weather[0].icon);
        setWeatherDeg(Math.floor(res.data.main.temp));
        setWeatherDes(res.data.weather[0].description);
      })
      .catch((err) => console.log(err));
  }, [city]);

  let imgUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
  return (
    <>
      <WeatherCard
        weatherCity={weatherCity}
        weatherDeg={weatherDeg}
        imgUrl={imgUrl}
        weatherDes={weatherDes}
      />
    </>
  );
}

export default CardAPI;
