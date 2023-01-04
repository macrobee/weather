import { useContext } from "react";

import { UnitContext } from "../contexts/unitContext";

import './ForecastCard.css';

const ForecastCard = (props) => {
  const { date, time, temp, icon, weather, windSpeed, windDir } = props.data;

  const { currentUnits, convertSpeedUnits, convertfromKelvin } =
    useContext(UnitContext);

  return (
    <div className="ForecastCard">
      <div>
        {date}
      </div>
      <div>{time}</div>
      <div>
        {convertfromKelvin(temp)}
        °{currentUnits}
      </div>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="weather icon"
      />
      <div>{weather}</div>
      <div>
        {convertSpeedUnits(windSpeed)}
        {currentUnits === "C" ? "km/h" : "mph"}
      </div>
    </div>
  );
};
export default ForecastCard;
