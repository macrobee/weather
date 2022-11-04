import {useState} from 'react';
import './Search.css';

function Search(props) {
  const [city, setCity] = useState('Toronto');
  function handleChange(e){
    setCity(e.target.value);
    console.log(`searching for ${city}`);
  }
    return (
      <div className="Search">
        
        <input type="text" onChange={handleChange} placeholder="Search for a location" defaultValue="Toronto"/>  
        <button onClick={props.onSearch}>Search</button>    
      </div>
    );
  }
  
  export default Search;
  