import React, { useEffect, useState } from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import { showDataOnMap } from "../services/countries";
import "../css/CovidMap.css";
import axios from "axios";

function CovidMap(props) {
  const [allCountriesData, setAllCountriesData] = useState([]);
  const [casesType, setCasesType] = useState("confirmed");

  useEffect(() => {
    async function fetchData() {
      try {
        const countries = await axios.get(
          "https://corona.lmao.ninja/v2/countries"
        );
        const countriesData = countries.data;
        setAllCountriesData(countriesData);
      } catch (error) {
        const environment = process.env.REACT_APP_ENV;
        const domain = process.env.REACT_APP_DOMAIN;
        const url =
          environment === "PROD"
            ? `${domain}/data/stats/countriesLatestData.json`
            : `/data/stats/countriesLatestData.json`;
        const dataResponse = await fetch(url);
        const data = await dataResponse.json();
        setAllCountriesData(data);
      }
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
        <option value="confirmed">Confirmed</option>
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
