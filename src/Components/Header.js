import './Header.css';
function Header(props) {
    return (
      <div className="Header">
        <div className="city-header">
          <h2 className="city-name">{props.city}</h2>
          
        </div>
        <div className="header-lower">
          <h3 className="city-state">{props.state}</h3>
          <p className="data-source">Powered by {props.source}</p>
        </div>

      </div>
    );
  }
  
  export default Header;
  