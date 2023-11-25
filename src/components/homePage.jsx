import React from "react";

import Covid_19 from "../img/Coronavirus.png";
import CovidCountryData from "../components/CovidCountryData";
import CovidVisualization from "../components/CovidVisualization";
import CountryInfo from "../components/CountryInfo";
import CovidRanking from "../components/CovidRanking";
import CovidWorldwide from "../components/CovidWorldwide";
import CovidMap from "../components/CovidMap";
import axios from "axios";
import numeral from "numeral";

class HomePage extends React.Component {
  state = {
    name: "",
    flag: "",
    capital: "",
    region: "",
    subregion: "",
    population: 0,
    language: "",
    currency: {},
    languages: [],
    isChart: false,
    lat: 34,
    lon: 9,
    zoom: 3,
  };

  setIsChart = () => {
    this.setState({ isChart: true });
  };

  getCountryData = async () => {
    // Get input value
    let country = document.querySelector("#country").value;

    // Handle url
    let pos = country.indexOf(" ");
    if (pos !== -1) {
      country = country.replace(" ", "%20");
    }
    let url = `https://corona.lmao.ninja/v2/countries/${country}`;
    let url2 = `https://restcountries.com/v3.1/name/${country}`;

    // Fetching Data
    try {
      const country_data = await axios.get(url);
      const data = country_data.data;

      const country_data2 = await axios.get(url2);
      const data2 = country_data2.data[0];

      this.setState({
        name: data.country,
        flag: data.countryInfo.flag,
        capital: data2.capital[0] || "Not Found",
        population: numeral(data.population).format("0,0"),
        language:
          data2.languages[`${Object.keys(data2.languages)[0]}`] || "Not Found",
        currency:
          data2.currencies[`${Object.keys(data2.currencies)[0]}`].name ||
          "Not Found",
        lat: data.countryInfo.lat,
        lon: data.countryInfo.long,
        zoom: 4,
      });
    } catch (error) {
      // API fails or no more supported. Parse data from local files
      const environment = process.env.REACT_APP_ENV;
      const domain = process.env.REACT_APP_DOMAIN;
      const url =
        environment === "PROD"
          ? `${domain}/data/stats/allCountriesInfo.json`
          : `/data/stats/allCountriesInfo.json`;
      const dataResponse = await fetch(url);
      const data = await dataResponse.json();
      const country = document.querySelector("#country").value;
      const countryInfo = data.filter(
        (e) => e.name.toLowerCase() === country
      )[0];
      this.setState({
        name: countryInfo.name,
        flag: countryInfo.flag,
        capital: countryInfo.capital || "Not Found",
        population: numeral(countryInfo.population).format("0,0"),
        language: countryInfo.languages[0] || "Not Found",
        currency: countryInfo.currency.name || "Not Found",
        lat: countryInfo.latlon.lat,
        lon: countryInfo.latlon.lon,
        zoom: 4,
      });
      console.log(countryInfo);
    }
  };

  render() {
    return (
      <div className="HomePage">
        <img src={Covid_19} alt="Covid_19" style={{ width: "90%" }}></img>
        <div className="main">
          <div className="container">
            <CovidWorldwide />
            <CovidCountryData setIsChart={this.setIsChart} />
            <CovidMap
              lat={this.state.lat}
              lon={this.state.lon}
              zoom={this.state.zoom}
            />
            <CovidVisualization
              name={this.state.name}
              flag={this.state.flag}
              capital={this.state.capital}
              population={this.state.population}
              language={this.state.language}
              currency={this.state.currency}
              setCountryData={this.getCountryData}
              isChart={this.state.isChart}
            />
          </div>
          <div className="country-info">
            <CountryInfo className="country-card" />
            <CovidRanking />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
