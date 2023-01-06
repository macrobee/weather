import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Header from "./Components/Header";
import Display from "./Components/Display";
import Search from "./Components/Search";
import ForecastContainer from "./Components/ForecastContainer";

import { ReactComponent as LeftArrow } from "./assets/leftArrow.svg";
import { ReactComponent as RightArrow } from "./assets/rightArrow.svg";
import { UnitContext } from "./contexts/unitContext";

function App() {
  const apiKey = "9391234097ce7183eff9a1f843eb7ff8";
  const [lat, setLat] = useState(43.653225);
  const [lon, setLon] = useState(-79.383186);
  const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  const {
    currentUnits,
    setCurrentUnits,
    convertFromKelvin,
    convertSpeedUnits,
  } = useContext(UnitContext);

  function changeUnits() {
    currentUnits === "C" ? setCurrentUnits("F") : setCurrentUnits("C");
    console.log(currentUnits);
  }

  const [weatherData, setWeatherData] = useState(null);
  useEffect(() => {
    //updates weather data every 15 min
    if (weatherData === null) {
      getData();
    }
    if (city === null && state === null) {
      setCity("Toronto");
      setState("Ontario");
    }
    const interval = setInterval(() => {
      getData();
      console.log(city, state, lat, lon);
    }, 900000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    //retrieves new data when location is updated
    getData();
  }, [lat, lon]);

  async function getData() {
    getForecast();
    try {
      const response = await fetch(urlCurrent);
      const data = await response.json();
      setCity(data.name);
      console.log(data);
      const retrievedWeatherData = {
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        minTemp: data.main.temp_min,
        maxTemp: data.main.temp_max,
        conditions: data.weather[0].main,
        icon: data.weather[0].icon,
        windSpeed: data.wind.speed,
        windDir: data.wind.deg,
      };
      setWeatherData(retrievedWeatherData);
    } catch (e) {
      console.log(e);
    }
  }
  function convertWeatherUnits(data) {
    const newWeatherData = {
      temp: convertFromKelvin(data.temp),
      feelsLike: convertFromKelvin(data.feelsLike),
      minTemp: convertFromKelvin(data.minTemp),
      maxTemp: convertFromKelvin(data.maxTemp),
      conditions: data.conditions,
      icon: data.icon,
      windSpeed: convertSpeedUnits(data.windSpeed),
      windDir: data.windDir,
    };
    return newWeatherData;
  }

  function changeCity(lat, lon, cityName, state) {
    console.log(`switching to ${cityName}, ${state} at ${lat}, ${lon}`);
    setLat(lat);
    setLon(lon);
    setState(state);
  }

  async function getCity(searchQuery) {
    const locationURL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=3&appid=${apiKey}`;
    try {
      const response = await fetch(locationURL);
      const data = await response.json();
      console.log(data);
      //check if city is a valid city
      const cityData = data.map((city) => {
        return {
          lon: city.lon,
          lat: city.lat,
          location: city.name,
          state: city.state,
        };
      });
      console.log("below is the list of city data");
      console.table(cityData);
      return cityData;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async function getForecast() {
    try {
      const response = await fetch(urlForecast);
      const data = await response.json();
      const forecastData = data.list;
      console.log(data);
      setForecast(forecastData);
      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  function toggleScroll(e) {
    const direction = e.target.id;
    const scrollAmount = 500;
    switch (direction) {
      case "increase" || "Path_57": //move to right (translate negative)
        if (scrollDistance > -6150) {
          const remainingScroll = 6050 + scrollDistance;
          setScrollDistance(
            scrollDistance -
              (remainingScroll > scrollAmount ? scrollAmount : remainingScroll)
          );
        }
        break;
      case "decrease" || "Path_56": //move to left (translate positive)
        if (scrollDistance < 0) {
          const remainingScroll = scrollDistance;
          setScrollDistance(
            scrollDistance +
              (remainingScroll < scrollAmount ? scrollAmount : -remainingScroll)
          );
        }

        break;
      default:
        return;
    }
  }

  const appAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };
  const componentAnimation={
    hidden:{opacity: 0},
    show: {opacity: 1}
  }
  return (
    <motion.div
      className="App"
      variants={appAnimation}
      initial="hidden"
      animate="show"
    >
      <Search onSearch={getCity} changeCity={changeCity} />

      <Header city={city} state={state} source="OpenWeatherAPI" />
      <Display weather={weatherData} />
      <label htmlFor="changeUnits" className="switch">
        {/* <label htmlFor="changeUnits">{currentUnits==="C" ? 'Celsius' : 'Fahrenheit'}</label> */}
        <input
          type="checkbox"
          name="changeUnits"
          id="changeUnits"
          onChange={changeUnits}
        />
        <span className="slider"></span>
      </label>
      <motion.div variants={componentAnimation} className="forecast-container-container">
        <RightArrow
          width={"20px"}
          height={"30px"}
          className={"arrow"}
          id="increase"
          onClick={toggleScroll}
        />
        <LeftArrow
          width={"20px"}
          height={"30px"}
          className="arrow"
          id="decrease"
          onClick={toggleScroll}
        />
        <div className="forecast-container">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, x: scrollDistance }}
              exit={{ opacity: 0 }}
            >
              <ForecastContainer
                data={forecast}
                scrollDistance={scrollDistance}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default App;
