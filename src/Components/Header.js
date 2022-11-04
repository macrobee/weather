import './Header.css';
function Header(props) {
    return (
      <div className="Header">
        <h2>{props.city}</h2>
        <h3>{props.country}</h3>
        <p>{props.source}</p>

      </div>
    );
  }
  
  export default Header;
  