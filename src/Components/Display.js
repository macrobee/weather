import { useState } from "react";
import './Display.css';


function Display(props) {
  console.log(props.weather);
  if (props.weather === null) {
    return <div className="Display">Loading data...</div>
  } else{  
    return (
    <div className="Display">
      <h2>Current Temperature: {props.weather.temp}°C</h2>
      <h3>Feels like {props.weather.feelsLike}°C</h3>
      <p>Min: {props.weather.minTemp}°C Max: {props.weather.maxTemp}°C</p>
      <p>Conditions: {props.weather.conditions}</p>

      <p>Wind: {props.weather.windSpeed}kph {props.weather.windDir}degrees</p>
    </div>
  );}
  }

export default Display;
