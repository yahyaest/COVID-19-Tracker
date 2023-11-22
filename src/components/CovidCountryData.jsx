import React, { Component } from "react";
import Card from "./common/Card";
import InputFrom from "./common/inputForm";
import "../css/CovidCountryData.css";
import { timeConverter } from "../services/countries";
import { Link } from "react-router-dom";
import axios from "axios";

class CovidData extends Component {
  state = {
    confirmed: 0,
    recovered: 0,
    deaths: 0,
    active: 0,
    lastUpdate: "",
    country: "",
  };

  getCountryData = async () => {
    // Get input value
    let country = document.querySelector("#country").value;
    this.setState({ country });

    // Handle url
    let pos = country.indexOf(" ");
    if (pos !== -1) {
      country = country.replace(" ", "%20");
    }
    let url = `https://corona.lmao.ninja/v2/countries/${country}`;

    // Fetching Data
    try {
      const countryResult = await axios.get(url);
      const countryData = countryResult.data;
      this.setState({
        confirmed: countryData.cases,
        recovered: countryData.recovered,
        deaths: countryData.deaths,
        active: countryData.cases - countryData.recovered - countryData.deaths,
        lastUpdate: timeConverter(countryData.updated),
      });
    } catch (error) {
      // API fails or no more supported. Parse data from local files
      const dataResponse = await fetch(
        `/data/stats/countriesLatestData.json`
      );
      const data = await dataResponse.json();
      const countryData = data.filter(e => e.country.toLowerCase() === country)[0];
      this.setState({
        confirmed: countryData.confirmed,
        recovered: countryData.recovered,
        deaths: countryData.deaths,
        active: countryData.confirmed - countryData.recovered - countryData.deaths,
        lastUpdate: countryData.date,
      });
    }
  };

  render() {
    const covidState = [
      {
        name: "confirmed",
        cardColor: "success",
        footerColor: "footer-color-success",
        headerText: "Confirmed Cases",
        mainNumber: this.state.confirmed,
        mainDate: this.state.lastUpdate,
        mainText: "Number of confirmed cases",
      },
      {
        name: "active",
        cardColor: "info",
        footerColor: "footer-color-info",
        headerText: "Active Cases",
        mainNumber: this.state.active,
        mainDate: this.state.lastUpdate,
        mainText: "Number of active cases",
      },
      {
        name: "deaths",
        cardColor: "danger",
        footerColor: "footer-color-danger",
        headerText: "Deaths Cases",
        mainNumber: this.state.deaths,
        mainDate: this.state.lastUpdate,
        mainText: "Number of deaths cases",
      },
      {
        name: "recovered",
        cardColor: "warning",
        footerColor: "footer-color-warning",
        headerText: "Recovered Cases",
        mainNumber: this.state.recovered,
        mainDate: this.state.lastUpdate,
        mainText: "Number of recoverd cases",
      },
    ];

    return (
      <div className="covid-data">
        <InputFrom
          setIsChart={this.props.setIsChart}
          onFetch={this.getCountryData}
        />

        <br></br>
        <br></br>

        <Card data={covidState} />

        {this.state.country && (
          <Link
            style={{ color: "wheat", textDecoration: "none" }}
            to={`/covid-19/${this.state.country}`}
          >
            More info on {this.state.country} covid-19 state
          </Link>
        )}
      </div>
    );
  }
}

export default CovidData;
