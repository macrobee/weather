import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import "./Search.css";
import Dropdown from "./CityDropdown";
import { ReactComponent as SearchIcon } from "./search.svg";

function Search(props) {
  const [city, setCity] = useState("Toronto");
  const [foundCities, setFoundCities] = useState(null);
  const [showResults, setShowResults] = useState(false);

  function handleChange(e) {
    setCity(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const searchQuery = e.target[0].value;
    // console.log("searching for " + e.target[0].value);
    setCity(searchQuery);
    setFoundCities(null);
    setShowResults(true);
    setTimeout(getCityList, 1000);
  }

  async function getCityList() {
    const cityList = await props.onSearch(city);
    setFoundCities(cityList);
  }

  function closeCityList() {
    setShowResults(false);
  }
  return (
    <div className="Search">
      <form id="searchbar" onSubmit={handleSubmit}>
        <div className="search-input">
          <input
            type="text"
            name="searchfield"
            onChange={handleChange}
            placeholder="Search for a location"
          />
          <button type="submit" className="search-button">
            <div className="search-button-div">
              <SearchIcon width="20px" height="20px" id="search-icon" />
            </div>{" "}
          </button>
        </div>
        {showResults && (
          <Dropdown
            items={foundCities}
            changeCity={props.changeCity}
            hideCities={closeCityList}
          />
        )}
      </form>
    </div>
  );
}

export default Search;
