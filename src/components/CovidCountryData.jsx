import React, { Component } from "react";
import Card from "./common/Card";
import InputFrom from "./common/inputForm";
import "../css/CovidCountryData.css";
import { timeConverter } from "../services/countries";
import { Link } from "react-router-dom";

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
    let country_data = await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        this.setState({
          confirmed: data.cases,
          recovered: data.recovered,
          deaths: data.deaths,
          active: data.cases - data.recovered - data.deaths,
          lastUpdate: timeConverter(data.updated),
        });
      })
      .catch((error) => console.log(error));
    await this.sleep(2000);

    return country_data;
  };

  sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
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
            style={{ color: "wheat" , textDecoration:"none"}}
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
