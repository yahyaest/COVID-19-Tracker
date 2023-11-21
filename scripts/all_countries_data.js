// src : https://github.com/pomber/covid19   (last-update 09/03/2023)

const fs = require("fs");
const path = require("path");

const countriesDataPath = "../public/data/countries";

const countriesList = [];
const countriesLatestData = [];

// Read the list of files in the directory
fs.readdir(countriesDataPath, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  // Loop through each file
  files.forEach((file) => {
    const filePath = path.join(countriesDataPath, file);
    const countryName = filePath
      .split("/")
      [filePath.split("/").length - 1].split(".")[0];
    countriesList.push(countryName);

    // Read the contents of the file
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(`Error reading file ${file}:`, err);
        return;
      }

      const countryData = JSON.parse(data);
      const countryLatestData = countryData[countryData.length - 1];
      countryLatestData.recovered =
        countryLatestData.confirmed - countryLatestData.deaths;
      countryLatestData.country = countryName;
      countriesLatestData.push(countryLatestData); // Push latest country data
      // console.log(`Contents of ${JSON.stringify(countryLatestData)}:`);

      if (files.length === countriesLatestData.length) {
        // Get top 10 countries
        const top10ConfirmedCountries = countriesLatestData
          .sort((a, b) => b.confirmed - a.confirmed)
          .slice(0, 10);
        const top10RecoveredCountries = countriesLatestData
          .sort((a, b) => b.recovered - a.recovered)
          .slice(0, 10);
        const top10DeathsCountries = countriesLatestData
          .sort((a, b) => b.deaths - a.deaths)
          .slice(0, 10);
        // console.log(top10DeathsCountries);
        // write Data

        const countriesListFile = `../public/data/stats/countriesList.json`;

        fs.writeFile(
          countriesListFile,
          JSON.stringify(countriesList),
          "utf8",
          (err) => {
            if (err) {
              console.error("Error writing to the file:", err);
              return;
            }
          }
        );

        const countriesLatestDataFile = `../public/data/stats/countriesLatestData.json`;

        fs.writeFile(
          countriesLatestDataFile,
          JSON.stringify(countriesLatestData),
          "utf8",
          (err) => {
            if (err) {
              console.error("Error writing to the file:", err);
              return;
            }
          }
        );
      }
    });
  });
});
