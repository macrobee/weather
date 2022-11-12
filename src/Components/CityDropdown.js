import "./CityDropdown.css";
import uniqid from "uniqid";
import { useEffect, useState } from "react";
// accepts array of items, returns unordered list of item location names
// each item must have 'location' property

function Dropdown(props) {
  function setLatLon(e) {
    const newLat = e.currentTarget.getAttribute("lat");
    const newLon = e.currentTarget.getAttribute("lon");
    const newCity = e.currentTarget.getAttribute("location");
    const newState = e.currentTarget.getAttribute("state");
    console.log(newLat + ", " + newLon);
    console.log(`switching to ${newCity}`);
    props.changeCity(newLat, newLon, newCity, newState);
    props.hideCities();
  }

  function renderListItems() {
    let listItems;
    if (props.items === []) {
      listItems = <li>Location not found</li>;
    } else if (props.items === null) {
      return;
    } else {
      listItems = props.items.map((item) => {
        return (
          <li
            key={uniqid()}
            lat={item.lat}
            lon={item.lon}
            location={item.location}
            state={item.state}
            onClick={setLatLon}
          >
            {item.location}{item.state ? ", " : null}{item.state}
          </li>
        );
      });
    }
    return listItems;
  }

  return (
    <div className="Dropdown">
      {/* <ul>{hasSelected ? null : renderListItems()}</ul> */}
      <ul>{renderListItems()}</ul>
    </div>
  );
}

export default Dropdown;
