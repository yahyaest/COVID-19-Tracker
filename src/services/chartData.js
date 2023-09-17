export const getChartData = async (country) => {
  try {
    let countryName =
      country.charAt(0).toUpperCase() + country.toLowerCase().substring(1);

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
