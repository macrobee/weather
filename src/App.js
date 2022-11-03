import './App.css';
import React, {useState, useEffect} from 'react';
import Header from './Components/Header';
import Display from './Components/Display';
import Search from './Components/Search';

function App() {
  const [city, setCity] = useState('Toronto');
  const [weatherData, setWeatherData] = useState(null);
  const [lat, setLat] = useState(43.653225);
  const [lon, setLon] = useState(-79.383186);
  const apiKey = '9391234097ce7183eff9a1f843eb7ff8';
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  useEffect(()=>{
    if (weatherData === null){getData()}
  })
  async function getData(){
    const response = await fetch(url);
    const data = await response.json();
    setCity(data.name);
    console.log(data);
    const newWeatherData = {temp: kelvinToCelsius(data.main.temp), 
      feelsLike: kelvinToCelsius(data.main.feels_like), 
      minTemp: kelvinToCelsius(data.main.temp_min), 
      maxTemp: kelvinToCelsius(data.main.temp_max), 
      conditions: data.weather[0].main, 
      windSpeed: data.wind.speed, 
      windDir: data.wind.deg};
    setWeatherData(newWeatherData);
  }
  function showDisplay(){
    return weatherData === null ? <h2>Loading data...</h2> : <Display weather={weatherData} />
  }
  function kelvinToCelsius(temp){
    return Math.round((temp-273)*100)/100;
  }
  function kelvinToFahrenheit(temp){
    return Math.round((kelvinToCelsius(temp)*9/5+32)*100)/100;
  }
  function getCity(city){
    //check if city is a valid city
    //return lon and lat of city
    //setLon(newLon) setLat(newLat)
    //call getData()
    console.log('hi');
  }
  return (
    <div className="App">
      <h1>Hello from App</h1>
      <Header city={city} country='Canada' source="OpenWeatherAPI"/>
      {showDisplay()}
      <Search onSearch={getCity}/>
      <button onClick={getData}>Refresh</button>
    </div>
  );
}

export default App;
