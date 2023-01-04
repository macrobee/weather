
const ForecastCard = (props) => {
    const {date, time, temp, icon, weather, windSpeed, windDir} = props.data;
    return(
        <div>
            <div>{date} {time}</div>
            <div>{temp}</div>
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon" />
            <div>{weather}</div>
            <div>{windSpeed}</div>
        </div>
    )
}
export default ForecastCard;