import './Forecast.css';
function Forecast(props) {
    console.log(props);
    return (
      <div className="Forecast">
        <h5>date</h5>
        <img src="/" alt="weather icon" />
        <h4>temperature</h4>
        <p>hi/low</p>
        

      </div>
    );
  }
  
  export default Forecast;
  