import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import Display from "./Components/Display";
import Search from "./Components/Search";
import ForecastContainer from "./Components/ForecastContainer";

function App() {
  const apiKey = "9391234097ce7183eff9a1f843eb7ff8";
  const [lat, setLat] = useState(43.653225);
  const [lon, setLon] = useState(-79.383186);
  const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [forecast, setForecast] = useState(null);

  const [tempUnits, setTempUnits] = useState("C");
  function convertTemperatureUnits(temp) {
    if (tempUnits === "C") {
      return Math.round(((temp - 32) * 5) / 9);
    } else if (tempUnits === "F") {
      return Math.round((temp * 9) / 5 + 32);
    }
  }
  function convertSpeedUnits(speed) {
    if (tempUnits === "C") {
      return Math.round(speed*1.6);
    } else if (tempUnits === "F") {
      return Math.round(speed / 1.6);
    }
  }
  function changeUnits() {
    if (tempUnits === "C") {
      setTempUnits("F");
    } else if (tempUnits === "F") {
      setTempUnits("C");
    }
    console.log(tempUnits);
  }

  const [weatherData, setWeatherData] = useState(null);
  useEffect(() => {
    if (weatherData === null) {
      getData();
    } 
    if (city === null && state === null) {
      setCity('Toronto');
      setState('Ontario');
    }
    const interval = setInterval(() => {
      getData();
      console.log(city, state, lat, lon);
    }, 900000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTempUnits("C");
    getData();
  }, [lat, lon]);
  useEffect(() => {
    if (weatherData) {
      setWeatherData(convertWeatherUnits(weatherData));
    }
  }, [tempUnits]);

  
  async function getData() {
    getForecast();
    try {
      const response = await fetch(urlCurrent);
      const data = await response.json();
      setCity(data.name);
      console.log(data);
      const retrievedWeatherData = {
        temp: Math.round(data.main.temp - 273.15),
        feelsLike: Math.round(data.main.feels_like - 273.15),
        minTemp: Math.round(data.main.temp_min - 273.15),
        maxTemp: Math.round(data.main.temp_max - 273.15),  
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
      temp: convertTemperatureUnits(data.temp),
      feelsLike: convertTemperatureUnits(data.feelsLike),
      minTemp: convertTemperatureUnits(data.minTemp),
      maxTemp: convertTemperatureUnits(data.maxTemp), 
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
  async function getForecast(){
    try{
      const response = await fetch(urlForecast);
      const data = await response.json();
      const forecastData = data.list;
      console.log(data);
      setForecast(forecastData);
      return data;
    } catch(e){
      console.log(e);
      return null
    }
  }
  return (
    <div className="App">
      <Search onSearch={getCity} changeCity={changeCity} />

      <Header city={city} state={state} source="OpenWeatherAPI" />
      <Display weather={weatherData} units={tempUnits} />
      <label htmlFor="changeUnits" className="switch" >
        {/* <label htmlFor="changeUnits">{tempUnits==="C" ? 'Celsius' : 'Fahrenheit'}</label> */}
        <input type="checkbox" name="changeUnits" id="changeUnits" onChange={changeUnits} />
        <span className="slider"></span>
      </label>
      <button onClick={getForecast}>Forecast</button>
      <ForecastContainer data={forecast}/>
    </div>
  );
}

export default App;
