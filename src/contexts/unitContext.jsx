import { createContext, useState } from "react";

export const UnitContext = createContext({
  currentUnits: "",
  setCurrentUnits: () => null,
  convertTemperatureUnits: () => null,
  convertSpeedUnits: () => null,
  convertFromKelvin: () => null,
});

export const UnitProvider = ({ children }) => {
  const [currentUnits, setCurrentUnits] = useState("C");

  const convertTemperatureUnits = (temp) => {
    if (currentUnits === "C") {
      return Math.round(((temp - 32) * 5) / 9);
    } else if (currentUnits === "F") {
      return Math.round((temp * 9) / 5 + 32);
    }
  };
  const convertFromKelvin = (temp) => {
    let temperature;
    currentUnits === "C"
      ? (temperature = Math.round(temp - 273.15))
      : (temperature = Math.round(((temp - 273.15) * 9) / 5 + 32));
      return temperature;
  };

  const convertSpeedUnits = (speed) => {
    let convertedSpeed;
    currentUnits === "C"
      ? (convertedSpeed = speed)
      : (convertedSpeed = Math.round(speed / 1.6));
    return convertedSpeed;
  };

  const value = {
    currentUnits,
    setCurrentUnits,
    convertTemperatureUnits,
    convertSpeedUnits,
    convertFromKelvin
  };
  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
};
