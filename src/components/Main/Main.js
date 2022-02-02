// Packages
import { useEffect, useState } from "react";
// Styles
import styles from "./Main.module.css";
// Components
import InputAPI from "../../MainAPI";
import axios from "axios";

function Main() {
  let initCity;
  if (navigator.language === "tr") initCity = "istanbul";
  else if (navigator.language === "ar") initCity = "riyadh";
  else if (navigator.language === "fr") initCity = "paris";
  else if (navigator.language === "de") initCity = "berlin";
  else if (navigator.language === "zh") initCity = "beijing";
  else initCity = "new york";

  const [inputCity, setInputCity] = useState(initCity);
  const [input, setInput] = useState();
  const [inputValue, setInputValue] = useState("");
  const key = "AIzaSyC0-bozypIT8J3u42EbffIb5Me0X67Nsrk";
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();

  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
    getLocation();
    function showPosition(position) {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);

      axios(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${key}`
      ).then((res) => {
        setInputCity(res.data.results[8].address_components[0].long_name);
      });
    }
  }, [lat, lon]);

  function citySubmitHandler(e) {
    e.preventDefault();
    setInputCity(input);
    setInputValue("");
  }

  function inputChangeHandler(e) {
    setInput(e.target.value);
    setInputValue(e.target.value);
  }
  return (
    <main>
      <form className={styles.inputContainer} onSubmit={citySubmitHandler}>
        <input
          type="text"
          id="input"
          className={styles.search}
          onChange={inputChangeHandler}
          value={inputValue}
          placeholder="Search a City"
        />
        <input type="submit" className={styles.glass} value="🔍" />
      </form>
      <div id="output" className={styles.outputContainer}>
        <InputAPI cityName={inputCity} />
      </div>
    </main>
  );
}

export default Main;
