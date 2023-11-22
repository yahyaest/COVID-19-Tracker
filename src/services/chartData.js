export const getChartData = async (country) => {
  try {
    let countryName = ""
    let countryNameList = country.split(" ")
    countryNameList.map(e => countryName = countryName +  " " + e.charAt(0).toUpperCase() + e.toLowerCase().substring(1))
    countryName = countryName.trim()

    const countryDataResponse = await fetch(
      `/data/countries/${countryName}.json`
    );
    const countryData = await countryDataResponse.json();

    //Setting the state
    let confirmed_cases = [];
    let recovered_cases = [];
    let death_cases = [];
    let dates = [];

    countryData.map((day) => {
      confirmed_cases.push(day.confirmed);
      recovered_cases.push(day.recovered);
      death_cases.push(day.deaths);
      dates.push(day.date);
    });

    return { confirmed_cases, recovered_cases, death_cases, dates };
  } catch (error) {
    console.log(error);
  }
};
