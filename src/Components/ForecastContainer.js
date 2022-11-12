import './ForecastContainer.css';
import Forecast from "./Forecast";
function ForecastContainer(props) {
    // console.log(props.data);
    function renderData(){
        if(props.data !== null) {
            const forecastList = props.data.map((dataPoint) =>{
                const info = {dateTime:dataPoint.dt_txt,
                temp:dataPoint.main.temp,
                high: dataPoint.main.temp_max,
                low: dataPoint.main.temp_min,
                pop: dataPoint.pop,
                weather: dataPoint.weather[0].description,
                icon: dataPoint.weather[0].icon,
                windSpeed: dataPoint.wind.speed,
                windDir: dataPoint.wind.deg, 
            }
                return <Forecast weather={info}/>
            })
            return forecastList;
        } else {
            return <p>Forecast cannot be loaded </p>;
        }
    }
    return (
      <div className="ForecastContainer">
        {renderData()}
      </div>
    );
  }
  
  export default ForecastContainer;
  