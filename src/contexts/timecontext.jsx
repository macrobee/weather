import { createContext, useEffect, useState } from "react";

export const TimeContext = createContext({
  currentTime: "",
  setCurrentTime: () => null,
});

export const TimeProvider = ({ children }) => {
  const [currentTime, setCurrentTime] = useState("day");
  useEffect(() => {
    const today = new Date();
    const time = today.getTime();
    console.log(time);
  }, []);

  const value = { currentTime, setCurrentTime };
  return <TimeContext.Provider value={value}>{children}</TimeContext.Provider>;
};
