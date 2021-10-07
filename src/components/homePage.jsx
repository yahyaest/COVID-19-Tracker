import React from "react";

import Covid_19 from "../img/Coronavirus.png";
import CovidCountryData from "../components/CovidCountryData";
import CovidVisualization from "../components/CovidVisualization";
import CountryInfo from "../components/CountryInfo";
import CovidRanking from "../components/CovidRanking";
import CovidWorldwide from "../components/CovidWorldwide";
import CovidMap from "../components/CovidMap";

class HomePage extends React.Component {
  state = {
    name: "",
    flag: "",
    capital: "",
    population: 0,
    language: "",
    currency: "",
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

    // Fetching Data
    const country_data = fetch(url)
      .then((response) => response.json())
      .then((data) => {
       // console.log(data);
        this.setState({
          name: data.country,
          flag: data.countryInfo.flag,
          capital: data.capital || "Not Found",
          population: data.population,
          language: data.languages || "Not Found",
          currency: data.currencies || "Not Found",
          lat: data.countryInfo.lat,
          lon: data.countryInfo.long,
          zoom: 4,
        });
      })

      .catch((error) => console.log(error));

    await this.sleep(1000);
    return country_data;
  };

  sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
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
