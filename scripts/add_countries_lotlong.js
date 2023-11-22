// src : https://github.com/pomber/covid19   (last-update 09/03/2023)

const fs = require("fs");

// Specify the path to your JSON file
const countriesInfoDataPath = "../public/data/stats/allCountriesInfo.json";
const countriesCovidDataPath = "../public/data/stats/countriesLatestData.json";
let countriesCovidData = [];
let countriesInfoData = [];
let allCountriesData = [];

fs.readFile(countriesCovidDataPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }
  try {
    countriesCovidData = data;
    fs.readFile(countriesInfoDataPath, "utf8", (err, data2) => {
      if (err) {
        console.error("Error reading the file:", err);
        return;
      }

      try {
        countriesInfoData = data2;
        // Parse the JSON data
        countriesCovidData = JSON.parse(countriesCovidData);
        countriesInfoData = JSON.parse(countriesInfoData);
        for (let countryCovidData of countriesCovidData) {
          try {
            countryInfoData = countriesInfoData.filter(
              (e) => e.name === countryCovidData.country
            )[0];
            if (countryInfoData) {
              countryCovidData.lat = countryInfoData.latlon.lat;
              countryCovidData.lon = countryInfoData.latlon.lon;
              allCountriesData.push(countryCovidData);
            } else {
              countryCovidData.lat = 0;
              countryCovidData.lon = 0;
              allCountriesData.push(countryCovidData);
            }
          } catch (error) {
            continue;
          }
        }
        // Get top 10 countries
        allCountriesData.sort((a, b) => b.confirmed - a.confirmed);
        // Write data

        fs.writeFile(
          countriesCovidDataPath,
          JSON.stringify(allCountriesData),
          "utf8",
          (err) => {
            if (err) {
              console.error("Error writing to the file:", err);
              return;
            }
          }
        );
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
      }
    });
  } catch (parseError) {
    console.error("Error parsing JSON:", parseError);
  }
});
