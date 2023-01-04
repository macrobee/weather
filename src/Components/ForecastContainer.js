import './ForecastContainer.css';
import Forecast from "./Forecast";
import ForecastCard from './ForecastCard';

import { summarizeForecastData } from '../functions/summarizeForecastData';

function ForecastContainer(props) {
    // console.log(props.data);
    function summarizeForecast(){
        if(props.data !== null) {
            const forecastList = summarizeForecastData(props.data); //return array of forecast data
            return forecastList.map((forecast)=>{
                return <ForecastCard data={forecast}/>
            })
        } else {
            return ;
        }
    }
    function renderData(){
        
    }
    return (
      <div className="ForecastContainer">
        {props.data ? summarizeForecast() : <p>Forecast cannot be loaded </p>}
      </div>
    );
  }
  
  export default ForecastContainer;
  