import React, { Component } from "react";
import Chart from "chart.js";
import axios from "axios";
import "../css/CovidVisualization.css";
import { getChartData } from "../services/chartData";

const timeLine = [
  "last week",
  "last month",
  "3 months ago",
  "6 months ago",
  "last year",
  "max",
];

class CovidVisualization extends Component {
  state = {
    Confirmed: [],
    Active: [],
    Recovered: [],
    Deaths: [],
    Dates: [],
    timeLineOption: "last year",
    showTimeBar: false,
    chartWidth: window.innerWidth,
  };

  // getData = async () => {
  //   // Get input value
  //   let country = document.querySelector("#country").value;

  //   // Handle url
  //   let pos = country.indexOf(" ");
  //   if (pos !== -1) {
  //     country = country.replace(" ", "%20");
  //   }
  //   let url = `https://api.covid19api.com/dayone/country/${country}`;

  //   //Setting the state
  //   let confirmed_cases = [];
  //   let active_cases = [];
  //   let recovered_cases = [];
  //   let death_cases = [];
  //   let dates = [];

  //   try {
  //     const countryResult = await axios.get(url);
  //     const countryData = countryResult.data;
  //     countryData.map((day) => {
  //       if (
  //         day.Confirmed >= confirmed_cases[confirmed_cases.length - 1] ||
  //         confirmed_cases.length === 0
  //       ) {
  //         confirmed_cases.push(day.Confirmed);
  //         active_cases.push(day.Active);
  //         recovered_cases.push(day.Recovered);
  //         death_cases.push(day.Deaths);
  //         dates.push(day.Date.slice(0, 10));
  //       }
  //       return 0;
  //     });
  //     this.setState({
  //       Confirmed: confirmed_cases,
  //       Active: active_cases,
  //       Recovered: recovered_cases,
  //       Deaths: death_cases,
  //       Dates: dates,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   await this.props.setCountryData();
  //   this.handleChart(this.state.timeLineOption);

  //   //Handle invisible elements
  //   document.querySelector("#card").classList.remove("invisible");
  //   document.querySelector("#table").classList.remove("invisible");

  //   //Handle country infos
  //   document.querySelector("#name").innerText = this.props.name;
  //   document.querySelector("#flag").setAttribute("src", this.props.flag);
  //   document.querySelector("#flag").style.border = "1px solid black";
  //   document.querySelector("#capital").innerText = this.props.capital;
  //   document.querySelector("#population").innerText = this.props.population;
  //   document.querySelector("#language").innerText = this.props.language;
  //   document.querySelector("#currency").innerText = this.props.currency;
  // };

  getData = async () => {
    // Get input value
    let country = document.querySelector("#country").value;

   
    try {
      const chartData = await getChartData(country)
      this.setState({
        Confirmed: chartData.confirmed_cases,
        Recovered: chartData.recovered_cases,
        Deaths: chartData.death_cases,
        Dates: chartData.dates,
      });
    } catch (error) {
      console.log(error);
    }

    await this.props.setCountryData();
    this.handleChart(this.state.timeLineOption);

    //Handle invisible elements
    document.querySelector("#card").classList.remove("invisible");
    document.querySelector("#table").classList.remove("invisible");

    //Handle country infos
    document.querySelector("#name").innerText = this.props.name;
    document.querySelector("#flag").setAttribute("src", this.props.flag);
    document.querySelector("#flag").style.border = "1px solid black";
    document.querySelector("#capital").innerText = this.props.capital;
    document.querySelector("#population").innerText = this.props.population;
    document.querySelector("#language").innerText = this.props.language;
    document.querySelector("#currency").innerText = this.props.currency;
  };

  filteredData = (data, time) => {
    switch (time) {
      case "last week":
        return data.slice(data.length - 7, data.length);
      case "last month":
        return data.slice(data.length - 30, data.length);
      case "3 months ago":
        return data.slice(data.length - 90, data.length);
      case "6 months ago":
        return data.slice(data.length - 180, data.length);
      case "last year":
        return data.slice(data.length - 366, data.length);
      case "max":
        return data;
      default:
        break;
    }
  };

  handleChart = (timeOption) => {
    const currentChart = document.getElementById("myChart");
    currentChart.remove();

    const chartDiv = document.querySelector(".covid_chart");
    const newChart = document.createElement("canvas");
    newChart.id = "myChart";
    newChart.width = window.innerWidth * 0.8;
    newChart.height = 500;
    chartDiv.appendChild(newChart);

    /* eslint-disable no-unused-vars */
    const myChart = new Chart(newChart, {
      type: "line",
      data: {
        labels: this.filteredData(this.state.Dates, timeOption),
        datasets: [
          {
            label: "Confirmed",
            data: this.filteredData(this.state.Confirmed, timeOption),
            backgroundColor: "rgba(254, 198, 1, 0.2)",
          },
          {
            label: "Recovered",
            data: this.filteredData(this.state.Recovered, timeOption),
            backgroundColor: "rgba(206, 121, 107, 0.2)",
          },
          // {
          //   label: "Active",
          //   data: this.filteredData(this.state.Active, timeOption),
          //   backgroundColor: "rgba(82, 183, 136, 0.2)",
          // },
          {
            label: "Deaths",
            data: this.filteredData(this.state.Deaths, timeOption),
            backgroundColor: "rgba(255, 255, 255, 0.4)",
          },
        ],
      },
    });

    /* eslint-disable no-unused-vars */
  };

  updateDimensions = () => {
    this.setState({ chartWidth: window.innerWidth });
  };
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    return (
      <div className="covid-vizualisation">
        {this.props.isChart && (
          <button
            onClick={async () => {
              await this.getData();
              this.setState({ showTimeBar: true });
            }}
            className="btn btn-danger m-2"
          >
            Visualize
          </button>
        )}
        <br></br>
        <div className="covid_chart">
          <canvas
            id="myChart"
            width={this.state.chartWidth}
            height="500"
          ></canvas>
        </div>
        {this.state.showTimeBar && (
          <div className="time-bar">
            <label htmlFor="timeline" className="text-white">
              Select time :{"    "}
            </label>
            <select
              name="timeline"
              id="timeline"
              onChange={(e) => {
                this.setState({ timeLineOption: e.target.value });
                this.handleChart(e.target.value);
              }}
            >
              {timeLine.map((timeOption) => (
                <option
                  key={timeOption}
                  value={timeOption}
                  selected={timeOption === "last year" ? "selected" : null}
                >
                  {timeOption}
                </option>
              ))}
              {this.state.timeLineOption}
            </select>
          </div>
        )}
      </div>
    );
  }
}

export default CovidVisualization;
