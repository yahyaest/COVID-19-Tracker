import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../css/countryPage.css";

const CountryPage = (props) => {
  const location = useLocation()
  const country = location.pathname.slice(10);
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchCountryData() {
      let url = `https://corona.lmao.ninja/v2/countries/${country}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        })
        .catch((error) => console.log(error));
    }

    fetchCountryData();
  }, []);

  return (
    <div className="country__page">
      <h1 style={{ textAlign: "center" }}>{country}</h1>
      <div className="country__info" style={{ textAlign: "center" }}>
        <img className="country__flag" src={data.countryInfo?.flag} alt="" />
        <h3>Covid-19 Info</h3>
        <div className="card general__covid19__info" style={{ width: "18rem" }}>
          <ul className="list-group list-group-flush">
            <li className="list-group-item ">
              Cases : {data.cases}
            </li>
            <li className="list-group-item ">
              Active : {data.active}
            </li>
            <li className="list-group-item ">
              Recovered : {data.recovered}
            </li>
            <li className="list-group-item ">
              Deaths : {data.deaths}
            </li>
            <li className="list-group-item ">
              Critical : {data.critical}
            </li>
          </ul>
        </div>
        <h3>Today Covid-19 Result</h3>
        <div className="card general__covid19__info" style={{ width: "18rem" }}>
          <ul className="list-group list-group-flush">
            <li className="list-group-item ">
              Today Cases : {data.todayCases}
            </li>
            <li className="list-group-item ">
              Today Deaths : {data.todayDeaths}
            </li>
            <li className="list-group-item ">
              Today Recovered : {data.todayRecovered}
            </li>
          </ul>
        </div>
        <h3>Info Per Pepole</h3>
        <div className="card general__covid19__info" style={{ width: "18rem" }}>
          <ul className="list-group list-group-flush">
            <li className="list-group-item ">
              Population : {data.population}
            </li>
            <li className="list-group-item ">
              One Case Per Pepole : {data.oneCasePerPeople}
            </li>
            <li className="list-group-item ">
              One Death Per Pepole : {data.oneDeathPerPeople}
            </li>
            <li className="list-group-item ">
              One Test Per Pepole : {data.oneTestPerPeople}
            </li>
          </ul>
        </div>
        <h3>Info Per Million</h3>
        <div className="card general__covid19__info" style={{ width: "18rem" }}>
          <ul className="list-group list-group-flush">
            <li className="list-group-item ">
              Cases Per Million : {data.casesPerOneMillion}
            </li>
            <li className="list-group-item ">
              Active Per Million : {data.activePerOneMillion}
            </li>
            <li className="list-group-item ">
              Recovered Per Million: {data.recoveredPerOneMillion}
            </li>
            <li className="list-group-item ">
              Deaths Per Million: {data.deathsPerOneMillion}
            </li>
            <li className="list-group-item ">
              Critical Per Million : {data.criticalPerOneMillion}
            </li>
            <li className="list-group-item ">
              Tests Per Million : {data.testsPerOneMillion}
            </li>
          </ul>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <button className="btn btn-danger text-center">
          <a className=" text-white text-decoration-none" href="/">
            Home
          </a>
        </button>
      </div>
    </div>
  );
};

export default CountryPage;
