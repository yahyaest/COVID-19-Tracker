// src : https://github.com/pomber/covid19   (last-update 09/03/2023)

const fs = require("fs");

// Specify the path to your JSON file
const filePath = "./countriesInfo.json";
const countriesPath = "../public/data/stats/countriesList.json";
let countriesList = [];
const allCountriesInfo = [];

fs.readFile(countriesPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }
  try {
    countriesList = data;
    fs.readFile(filePath, "utf8", (err, data2) => {
      if (err) {
        console.error("Error reading the file:", err);
        return;
      }

      try {
        // Parse the JSON data
        const countries = JSON.parse(countriesList);
        for (let country of countries) {
          try {
            const allData = JSON.parse(data2);
            const countryInfo = allData.filter(
              (e) => e.name.common === country
            )[0];
            const countryPayload = {
              name: countryInfo.name.common,
              currency: {
                name: countryInfo.currencies[
                  Object.keys(countryInfo.currencies)[0]
                ].name,
                symbol:
                  countryInfo.currencies[Object.keys(countryInfo.currencies)[0]]
                    .symbol,
              },
              capital: countryInfo.capital[0],
              region: countryInfo.region,
              subregion: countryInfo.subregion,
              languages: Object.values(countryInfo.languages),
              population: countryInfo.population,
              flag: countryInfo.flags.png,
              latlng: {
                lat: countryInfo.latlng[0],
                lng: countryInfo.latlng[1],
              },
            };
            allCountriesInfo.push(countryPayload);
          } catch (error) {
            continue;
          }
        }
        // Write data
        const allCountriesInfoFile = `../public/data/stats/allCountriesInfo.json`;

        fs.writeFile(
          allCountriesInfoFile,
          JSON.stringify(allCountriesInfo),
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
