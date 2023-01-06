import { useContext } from "react";

import { UnitContext } from "../contexts/unitContext";

import './ForecastCard.css';

const ForecastCard = (props) => {
  const { date, time, temp, icon, weather, windSpeed, windDir } = props.data;

  const { currentUnits, convertSpeedUnits, convertFromKelvin } =
    useContext(UnitContext);

  return (
    <div className="ForecastCard">
      <div>
        {date}
      </div>
      <div>{time}</div>
      <div>
        {convertFromKelvin(temp)}
        °{currentUnits}
      </div>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="weather icon"
      />
      <div>{weather}</div>
      <div>
        Wind: {Math.round(convertSpeedUnits(windSpeed))}
        {currentUnits === "C" ? "km/h" : "mph"}
      </div>
    </div>
  );
};
export default ForecastCard;
