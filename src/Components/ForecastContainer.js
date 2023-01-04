import {ForecastContainerDiv} from './ForecastContainer.styles.jsx';
// import Forecast from "./Forecast";
import ForecastCard from './ForecastCard';
import uniqid from 'uniqid';

import { summarizeForecastData } from '../functions/summarizeForecastData';

function ForecastContainer(props) {
    // console.log(props.data);
    function summarizeForecast(){
        if(props.data !== null) {
            const forecastList = summarizeForecastData(props.data); //return array of forecast data
            return forecastList.map((forecast)=>{
                return <ForecastCard key={uniqid()} data={forecast}/>
            })
        } else {
            return ;
        }
    }
    return (
      <ForecastContainerDiv className="ForecastContainer" scrollDistance={props.scrollDistance}>
        {props.data ? summarizeForecast() : <p>Forecast cannot be loaded </p>}
      </ForecastContainerDiv>
    );
  }
  
  export default ForecastContainer;
  