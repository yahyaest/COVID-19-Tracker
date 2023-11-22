const fs = require("fs");
const path = require("path");

const countriesDataPath = "../public/data/countries";

const countriesList = [];
const countriesLatestData = [];
let worldConfirmedfCases = 0;
let worldRecoveredfCases = 0;
let worldDeathsCases = 0;

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
      worldConfirmedfCases = worldConfirmedfCases + countryLatestData.confirmed;
      worldRecoveredfCases = worldRecoveredfCases + countryLatestData.recovered;
      worldDeathsCases = worldDeathsCases + countryLatestData.deaths;

      if (files.length === countriesLatestData.length) {
        // Get top 10 countries
        countriesLatestData
          .sort((a, b) => b.confirmed - a.confirmed)
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

        const worldDataFile = `../public/data/stats/worldData.json`;

        worldData = {
          confirmed: worldConfirmedfCases,
          recovered: worldRecoveredfCases,
          deaths: worldDeathsCases,
          lastUpdate: "2023-3-9",
        };

        fs.writeFile(
          worldDataFile,
          JSON.stringify(worldData),
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
