import React, { Component } from "react";
import { countriesResults } from "../services/countries";
import "../css/CovidRanking.css";
import "flag-icon-css/css/flag-icon.css";
import _ from "lodash";
import TableHead from "./common/tableHead";
import TableBody from "./common/tableBody";

class CovidRanking extends Component {
  state = {
    countriesInfo: [],
    sortColumn: { path: "cases", order: "desc" },
  };
  columns = [
    {
      path: "alpha2Cod",
      label: "Flag",
      renderFlag: (country) => {
        return (
          <h3>
            <span
              className={`flag-icon flag-icon-${country.alpha2Cod} flag-icon-squared`}
            ></span>
          </h3>
        );
      },
    },
    { path: "name", label: "Country" },
    { path: "cases", label: "Confirmed" },
    { path: "recovered", label: "Recovered" },
    { path: "deaths", label: "Deaths" },
  ];

  async updateState() {
    let results = await countriesResults();

    await this.sleep(1000);
    let countriesInfo = [];
    let index = 0;
    let countries = results[0];
    countries.map((country) => {
      let countryInfo = {
        name: "",
        alpha2Cod: "",
        cases: "",
        recovered: "",
        deaths: "",
      };
      countryInfo.name = countries[index];
      countryInfo.alpha2Cod = results[4][index];
      countryInfo.cases = results[1][index];
      countryInfo.recovered = results[2][index];
      countryInfo.deaths = results[3][index];
      //console.log(countryInfo)

      countriesInfo.push(countryInfo);
      index++;
      return 0;
    });

    this.setState({
      countriesInfo,
    });

    //console.log(countriesInfo);
    return {
      countriesInfo,
    };
  }

  sortData = () => {
    const { sortColumn, countriesInfo } = this.state;
    const sortedCountries = _.orderBy(
      countriesInfo,
      [sortColumn.path],
      [sortColumn.order]
    );
   // console.log(sortedCountries);
    return { countriesInfo: sortedCountries };
  };

  raiseSort = (path) => {
    const sortColumn = { ...this.state.sortColumn };

    if (path !== "alpha2Cod" && path !== "name") {
      if (sortColumn.path === path) {
        sortColumn.order = sortColumn.order === "desc" ? "asc" : "desc";
      } else {
        sortColumn.path = path;
        sortColumn.order = "desc";
      }
    }
    this.setState({ sortColumn });
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.state;
    if (column.path === "alpha2Cod" || column.path === "name") return null;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  componentWillMount() {
    this.updateState();
  }
  render() {
    const { countriesInfo } = this.sortData();

    return (
      <div id="table" className="invisible">
        <h2> Top infected countries </h2>
        <table className="table table-striped">
          <TableHead
            columns={this.columns}
            raiseSort={this.raiseSort}
            renderSortIcon={this.renderSortIcon}
          />

          <TableBody columns={this.columns} countries={countriesInfo} />
        </table>
      </div>
    );
  }
}

export default CovidRanking;
