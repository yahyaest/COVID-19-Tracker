import axios from "axios";
import numeral from "numeral";
import React from "react";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
  cases: {
    hex: "#28a745",
    rgb: "rgb(40,167,69)",
    half_op: "rgba(40,167,69, 0.5)",
    multiplier: 100,
  },

  active: {
    hex: "#17a2b8",
    rgb: "rgb(23,162,184)",
    half_op: "rgba(23,162,184, 0.5)",
    multiplier: 500,
  },
  recovered: {
    hex: "#ffc107",
    rgb: "rgb(255,193,7)",
    half_op: "rgba(255,193,7, 0.5)",
    multiplier: 150,
  },
  deaths: {
    hex: "#dc3545",
    rgb: "rgb(220,53,69)",
    half_op: "rgba(220,53,69, 0.5)",
    multiplier: 1000,
  },
};

export async function getTopCountries() {
  let allCountriesData = [];
  let url = "";
  let countries_confirmed = [];
  let covid_table = [];

  // Fetching API Data
  url = `https://corona.lmao.ninja/v2/countries`;

  try {
    const allCountries = await axios.get(url);
    allCountriesData = allCountries.data;
  } catch (error) {
    console.log(error);
  }

  // Create countries confirmed cases table
  allCountriesData.map((Country) => {
    let covid_countries = {
      name: "",
      confirmed: 0,
    };
    countries_confirmed.push(Country.cases);
    covid_countries.name = Country.country;
    covid_countries.confirmed = Country.cases;
    covid_table.push(covid_countries);

    return covid_countries;
  });

  // Sorting countries_confirmed
  selectionSort(countries_confirmed);

  // Get top 10 affected countries
  const top_countries = countries_confirmed.slice(0, 10);
  let selected_countries = [];
  for (let i = 0; i < top_countries.length; i++) {
    for (let j = 0; j < covid_table.length; j++) {
      if (covid_table[j].confirmed === top_countries[i]) {
        selected_countries.push(covid_table[j].name);
      }
    }
  }
  return selected_countries;
}

export async function countriesResults() {
  let confirmed = [];
  let recovered = [];
  let deaths = [];
  let alpha2Code_table = [];

  try {
    const topCountries = await getTopCountries();
    let url = `https://corona.lmao.ninja/v2/countries/${topCountries.join(
      ","
    )}`;
    const countriesResults = await axios.get(url);
    const countriesData = countriesResults.data;
    for (let country of countriesData) {
      confirmed.push(country.cases);
      recovered.push(country.recovered);
      deaths.push(country.deaths);
      alpha2Code_table.push(country.countryInfo.iso2.toLowerCase());
    }
    return [topCountries, confirmed, recovered, deaths, alpha2Code_table];
  } catch (error) {
    // API fails or no more supported. Parse data from local files
    const countryDataResponse = await fetch(
      `/data/stats/countriesLatestData.json`
    );
    const countryData = await countryDataResponse.json();
    const topCountries = countryData.splice(0, 10);
    const alpha2CodeList = [
      { country: "Usa", alpha2Code: "us" },
      { country: "India", alpha2Code: "in" },
      { country: "France", alpha2Code: "fr" },
      { country: "Germany", alpha2Code: "de" },
      { country: "Brazil", alpha2Code: "br" },
      { country: "Italy", alpha2Code: "it" },
      { country: "Uk", alpha2Code: "gb" },
      { country: "Russia", alpha2Code: "ru" },
      { country: "South Korea", alpha2Code: "kr" },
      { country: "Japan", alpha2Code: "jp" },
    ];
    let countriesNames = [];
    for (let country of topCountries) {
      countriesNames.push(country.country);
      confirmed.push(country.confirmed);
      recovered.push(country.recovered);
      deaths.push(country.deaths);
      alpha2Code_table.push(alpha2CodeList.filter(e => e.country === country.country)[0].alpha2Code);
    }
    const isLocalData = true;
    return [
      topCountries,
      confirmed,
      recovered,
      deaths,
      alpha2Code_table,
      countriesNames,
      isLocalData,
    ];
  }
}

function selectionSort(array) {
  for (let i = 0; i < array.length; i++) {
    let max = array[i];
    let max_index = i;
    for (let j = i; j < array.length; j++) {
      if (array[j] >= max) {
        max = array[j];
        max_index = j;
      }
    }
    swap(i, max_index, array);
  }
}

function swap(a, b, array) {
  let aux = array[a];
  array[a] = array[b];
  array[b] = aux;
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function timeConverter(UNIX_timestamp) {
  let currentTime = new Date(UNIX_timestamp);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let year = currentTime.getFullYear();
  let month = months[currentTime.getMonth()];
  let date = currentTime.getDate();
  let hour = currentTime.getHours() - 1;
  let min =
    currentTime.getMinutes() > 9
      ? currentTime.getMinutes()
      : "0" + currentTime.getMinutes();
  let sec =
    currentTime.getSeconds() > 9
      ? currentTime.getSeconds()
      : "0" + currentTime.getSeconds();
  let time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}

export function showDataOnMap(data, casesType) {
  return data.map((country) => (
    <Circle
      key={country.country}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <p>
          <strong style={{ color: `${casesTypeColors[casesType].hex}` }}>
            {country.country}-{casesType}
          </strong>
          : {numeral(country[casesType]).format("0,0")}
        </p>
      </Popup>
    </Circle>
  ));
}
