// src : https://github.com/pomber/covid19   (last-update 09/03/2023)

const fs = require("fs");

// Specify the path to your JSON file
const filePath = "./timeseries.json";

// Read the JSON file
fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
        console.error("Error reading the file:", err);
        return;
    }

    try {
        // Parse the JSON data
        const jsonData = JSON.parse(data);
        const countries = Object.keys(jsonData);
        // console.log(jsonData[countries[0]]);
        for (let country of countries) {
            const filePathToWrite = `../src/data/countries/${country}.json`;

            fs.writeFile(filePathToWrite, JSON.stringify(jsonData[country]), "utf8", (err) => {
                if (err) {
                    console.error("Error writing to the file:", err);
                    return;
                }
                console.log(`Data for country ${country} has been written to the file successfully.`);
            });
        }
    } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
    }
});