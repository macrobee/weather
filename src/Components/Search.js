import {useState} from 'react';

function Search(props) {
  const [city, setCity] = useState('Toronto');
  function handleChange(e){
    setCity(e.target.value);
    console.log(`searching for ${city}`);
  }
    return (
      <div className="App">
        <input type="text" onChange={handleChange} placeholder="Search for a location" defaultValue="Toronto"/>  
        <button onClick={props.onSearch}>Search</button>    
      </div>
    );
  }
  
  export default Search;
  