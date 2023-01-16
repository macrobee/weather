export const summarizeForecastData = (data) => {
  const dateFormat = {weekday:"short", month: "short", day:"numeric"}
  
  const forecastList = data.map((dataPoint) => {
    const date = new Date(dataPoint.dt_txt);
    const info = {
      date: date.toLocaleDateString('en-US', dateFormat),
      time: dataPoint.dt_txt.slice(11, 16),
      temp: Math.round(dataPoint.main.temp),
      high: dataPoint.main.temp_max, //take highest temp in date
      low: dataPoint.main.temp_min, //take lowest temp in date
      pop: dataPoint.pop, //take average of pop readings, rounded to nearest 10
      weather: dataPoint.weather[0].description, //take middle one??
      icon: dataPoint.weather[0].icon, //take middle one
      windSpeed: dataPoint.wind.speed, // take average of readings
      windDir: dataPoint.wind.deg, //take average of readings
    };
    return info;
  });

  return forecastList;
};
