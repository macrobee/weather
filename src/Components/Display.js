import { useState } from "react";


function Display(props) {
  const [weatherData, setWeatherData] = useState(props.weather);
  return (
    <div className="Display">
      <h2>Current Temperature: {weatherData.temp}</h2>
      <h3>Feels like {weatherData.feelsLike}</h3>
      <p>Min: {weatherData.minTemp} Max: {weatherData.maxTemp}</p>
      <p>Conditions: {weatherData.conditions}</p>

      <p>Wind: {weatherData.windSpeed}kph {weatherData.windDir}degrees</p>
    </div>
  );
  }

export default Display;
