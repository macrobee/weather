import { useState,useContext } from "react";

import { UnitContext } from "../contexts/unitContext";
import "./Display.css";
import { ReactComponent as Arrow } from "./uparrow.svg";

function Display(props) {
  // console.log(props.weather);
  const {currentUnits, convertFromKelvin, convertSpeedUnits} = useContext(UnitContext);
  function translateWindSpeed(direction) {
    if (direction === 0) {
      return "N";
    } else if (direction < 90) {
      return "NE";
    } else if (direction === 90) {
      return "E";
    } else if (direction < 180) {
      return "SE";
    } else if (direction === 180) {
      return "S";
    } else if (direction < 270) {
      return "SW";
    } else if (direction < 360) {
      return "NW";
    } else if (direction === 270) {
      return "W";
    }
  }
  if (props.weather === null) {
    return <div className="Display">Loading data...</div>;
  } else {
    return (
      <div className="Display">
        <h2 className="primary-temperature">
          {convertFromKelvin(props.weather.temp)}°{currentUnits}
        </h2>
        <h3 className="feels-like">
          Feels like {convertFromKelvin(props.weather.feelsLike)}°{currentUnits}
        </h3>
        
        <h2 className="primary-conditions">{props.weather.conditions}</h2>
        <div className="icon-container"><img src={`https://openweathermap.org/img/wn/${props.weather.icon}@2x.png`} alt="weather icon" id="image-icon"/></div>
        <p className="high-low">
          High: {convertFromKelvin(props.weather.maxTemp)}°{currentUnits} </p>
        <p> Low: {convertFromKelvin(props.weather.minTemp)}°{currentUnits} </p>
        <div className="wind">
          <p className="wind-text">
            Wind: 
          </p>
          <Arrow
          width="25px"
          height="25px"
          style={{ transform: `rotate(${180+ props.weather.windDir}deg)` }}
        />
        </div>
        <p>{convertSpeedUnits(props.weather.windSpeed)} {currentUnits === 'C' ? 'km/h ' : 'mph '}
            from {translateWindSpeed(props.weather.windDir)}</p>
        {/* {props.weather.windDir}degrees */}
        
      </div>
    );
  }
}

export default Display;
