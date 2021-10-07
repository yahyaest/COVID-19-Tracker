import React, { useEffect, useState } from "react";
import { Map, TileLayer, Marker, Circle } from "react-leaflet";
import "../css/CovidMap.css";
import { showDataOnMap } from "../services/countries";

function CovidMap(props) {
  const [allCountriesData, setAllCountriesData] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    async function fetchData() {
      await fetch("https://corona.lmao.ninja/v2/countries")
        .then((response) => response.json())
        .then((data) => {
          // console.log("newest", data);
          setAllCountriesData(data);
        })
        .catch((error) => console.log(error));
    }
    fetchData();
  }, []);

  return (
    <div className="covid_map">
      <select
        name=""
        id=""
        defaultValue="cases"
        onChange={(e) => setCasesType(e.currentTarget.value)}
      >
        <option value="cases">
          Confirmed
        </option>
        <option value="active">Active</option>
        <option value="recovered">Recovered</option>
        <option value="deaths">Deaths</option>
        {casesType}
      </select>
      <Map
        center={[props.lat, props.lon]}
        zoom={props.zoom}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[props.lat, props.lon]}></Marker>

        {showDataOnMap(allCountriesData, casesType)}
      </Map>
    </div>
  );
}

export default CovidMap;
