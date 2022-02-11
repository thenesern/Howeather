// Packages
import { useEffect, useState } from "react";
// Styles
import styles from "./Main.module.css";
// Components
import InputAPI from "../../MainAPI";
import axios from "axios";

function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputCity, setInputCity] = useState();
  const [input, setInput] = useState();
  const [inputValue, setInputValue] = useState("");
  const key = "AIzaSyC0-bozypIT8J3u42EbffIb5Me0X67Nsrk";
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();

  useEffect(() => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, NoLocation);
    }
    function NoLocation() {
      if (navigator.language === "tr") setInputCity("istanbul");
      else if (navigator.language === "ar") setInputCity("riyadh");
      else if (navigator.language === "fr") setInputCity("paris");
      else if (navigator.language === "de") setInputCity("berlin");
      else if (navigator.language === "zh") setInputCity("beijing");
      else setInputCity("new york");
      setIsLoading(false);
    }
    async function showPosition(position) {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);

      await axios(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${key}`
      ).then((res) => {
        if (res.data.plus_code.compound_code.split("/")[1].split(",")[0]) {
          setInputCity(
            res.data.plus_code.compound_code.split("/")[1].split(",")[0]
          );
        } else {
          setInputCity(res.data.results[0].address_components[2].long_name);
        }
      });
      setIsLoading(false);
    }
  }, [lat, lon]);

  function citySubmitHandler(e) {
    e.preventDefault();
    if (inputValue.trim().length > 0) {
      setInputCity(input);
      setInputValue("");
    } else {
      return;
    }
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
        {isLoading ? (
          <>
            <div></div>
            <div className={styles.loaderContainer}>
              <p className={styles.locationMessage}>
                Waiting for your location
              </p>
              <div className={styles.loader}></div>
            </div>
            <div></div>
          </>
        ) : (
          <InputAPI cityName={inputCity} />
        )}
      </div>
    </main>
  );
}

export default Main;
