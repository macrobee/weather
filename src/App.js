import './App.css';
import React, {useState, useEffect} from 'react';
import Header from './Components/Header';
import Display from './Components/Display';
import Search from './Components/Search';

function App() {
  const apiKeyWeather = '9391234097ce7183eff9a1f843eb7ff8';
  const apiKeyLocation = 'AIzaSyDnAOHUsh2v8HeuHqUiNGvKuz7wOUZauj0';
  
  const [tempUnits, setTempUnits] = useState('celsius');
  function kelvinToCelsius(temp){
    return Math.round((temp-273)*100)/100;
  }
  function kelvinToFahrenheit(temp){
    return Math.round((kelvinToCelsius(temp)*9/5+32)*100)/100;
  }

  const [weatherData, setWeatherData] = useState(null);
  useEffect(()=>{
    if (weatherData === null){getData()} //updates display on initial render when weatherdata is retrieved
    console.log('updated state');
  }, [weatherData])
  //update display when refresh is pushed

  const [city, setCity] = useState('Toronto');
  async function getData(){
    const response = await fetch(url);
    const data = await response.json();
    setCity(data.name);
    console.log(data);
    const newWeatherData = {temp: kelvinToCelsius(data.main.temp), 
      feelsLike: kelvinToCelsius(data.main.feels_like), 
      minTemp: kelvinToCelsius(data.main.temp_min), 
      maxTemp: kelvinToCelsius(data.main.temp_max), //need to allow for switching degree units
      conditions: data.weather[0].main, 
      windSpeed: data.wind.speed, //change to mph later
      windDir: data.wind.deg};
    setWeatherData(newWeatherData);
  }

  const [lat, setLat] = useState(43.653225);
  const [lon, setLon] = useState(-79.383186);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKeyWeather}`;
  
  const apiKeyGeoParse = '18884401811951570454x58907';
  const text = 'Toronto';
  const urlGeo = `https://geocode.xyz/?scantext=${text}&geoit=JSON&auth=${apiKeyGeoParse}`;
  async function getCity(){
    const response = await fetch(urlGeo);
    const data = await response.json();
    console.log(data);
    //check if city is a valid city
    //return lon and lat of city
    //setLon(newLon) setLat(newLat)
    //call getData()
    console.log('hi');
  }
  return (
    <div className="App">
      <Header city={city} country='Canada' source="OpenWeatherAPI"/>
      <Display weather={weatherData} />
      <Search onSearch={getCity}/>
      <button onClick={getData}>Refresh</button>
      <button onClick={getCity}>Get city</button>
    </div>
  );
}

export default App;
