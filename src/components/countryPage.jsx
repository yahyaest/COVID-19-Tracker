import React, { useState, useEffect } from "react";
import "../css/countryPage.css";

const CountryPage = (props) => {
  const country = props.location.pathname.slice(10);

  const [data, setData] = useState({});
  const [scrapHTML, setScrapHTML] = useState("");

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

  useEffect(() => {
    async function scrapping() {
      fetch(
        "https://cors-anywhere.herokuapp.com/https://fr.wikipedia.org/wiki/Pand%C3%A9mie_de_Covid-19_en_Tunisie"
      )
        .then(function (response) {
          switch (response.status) {
            // status "OK"
            case 200:
              return response.text();
            // status "Not Found"
            case 404:
              throw response;
          }
        })
        .then(function (template) {
          //console.log(template);
          setScrapHTML(template);
        })
        .catch(function (response) {
          // "Not Found"
          console.log(response.statusText);
        });
    }
    scrapping();
  }, []);

  function cleanUp(array) {
    const begin = array.indexOf(`(nouveaux cas entre parenthèses)`);
    const end = array.indexOf(
      `</i> <a href="/wiki/Minist%C3%A8re_de_la_Sant%C3%A9_publique_(Tunisie)" title="Ministère de la Santé publique (Tunisie)">Ministère de la Santé publique`
    );
    array = array.slice(begin, end).split(`</td>
<td>`);
    let stateCovid = [];
    array.forEach((line, index) => {
      if (index === 0) {
        let pos1 = line.lastIndexOf(`">`);
        let pos2 = line.lastIndexOf(`</a>`);
        line = line.slice(pos1 + 2, pos2);
        stateCovid.push(line);
      } else if (line.indexOf(`</a>`) !== -1) {
        let pos1 = line.search(`</td></tr>`);
        let pos2 = line.search(`">`);
        let pos3 = line.search(`</a>`);
        stateCovid.push(line.slice(0, pos1));
        stateCovid.push(line.slice(pos2 + 2, pos3));
      } else if (index === 96) {
        let pos = line.lastIndexOf(`</td></tr>`);
        line = line.slice(0, pos);
        stateCovid.push(line);
      } else if (index > 96) {
        //pass
      } else stateCovid.push(line);
    });
    //console.log(stateCovid);
    return stateCovid;
  }

  function stateInfo(array) {
    let covidStateData = [];
    const stateNumber = array.length / 5;

    for (let i = 0; i < stateNumber; i++) {
      let stateCovidInfo = {
        name: "",
        confirmed: "",
        deaths: "",
        recovered: "",
        actif: "",
      };
      stateCovidInfo.name = array[5 * i];
      stateCovidInfo.confirmed = array[5 * i + 1];
      stateCovidInfo.deaths = array[5 * i + 2];
      stateCovidInfo.recovered = array[5 * i + 3];
      stateCovidInfo.actif = array[5 * i + 4];
      covidStateData.push(stateCovidInfo);
    }
    console.log(covidStateData);
    return covidStateData;
  }

  // allStateCovidData = cleanUp(scrapHTML);
  //const tunisiaStateInfo = stateInfo(allStateCovidData);
  console.log(data);

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

      {/* { country === "tunisia" && <div className="state__info">
        <h3>State Info</h3>
        <table className="table table-striped">
          <thead>
            <tr className="table-info">
              <th>State</th>
              <th>Confirmed</th>
              <th>Deaths</th>
              <th>Recovered</th>
              <th>Actif</th>
            </tr>
          </thead>
          <tbody>
            {tunisiaStateInfo.map((state) => (
              <tr>
                <td>{state.name}</td>
                <td>{state.confirmed}</td>
                <td>{state.deaths}</td>
                <td>{state.recovered}</td>
                <td>{state.actif}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>} */}
      <div style={{ textAlign: "center" }}>
        {" "}
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
