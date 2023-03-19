import React, { useState, useEffect } from "react";
import { timeConverter } from "../services/countries";
import CountUp from "react-countup";
import axios from "axios";
import "../css/CovidWorldwide.css";

const CovidWorldwide = () => {
  const [confirmed, setConfirmed] = useState(0);
  const [recovered, setRecovered] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(0);

  useEffect(() => {
    async function worldwideData() {
      const url = "https://corona.lmao.ninja/v2/all";
      try {
        const result = await axios.get(url);
        const data = result.data;
        setConfirmed(data.cases);
        setRecovered(data.recovered);
        setDeaths(data.deaths);
        setLastUpdate(timeConverter(data.updated));
      } catch (error) {
        console.log(error);
      }
    }
    worldwideData();
  }, []);

  return (
    <div className="covid-worldwide card text-center">
      <div className="card-header">
        <h3> COVID-19 Worldwide Cases</h3>
      </div>
      <div className="card-body">
        <div className="sub-card">
          <div className="sub-card-confirmed">
            <p>Confirmed</p>
            <h3 className="confirmed-count">
              <CountUp start={0} end={confirmed} duration={2.5} separator="," />
            </h3>
          </div>
          <div className="sub-card-recovered">
            <p>Recovered</p>
            <h3 className="recovered-count">
              <CountUp start={0} end={recovered} duration={2.5} separator="," />
            </h3>
          </div>
          <div className="sub-card-deaths">
            <p>Deaths</p>
            <h3 className="deaths-count">
              <CountUp start={0} end={deaths} duration={2.5} separator="," />
            </h3>
          </div>
        </div>
      </div>
      <div className="card-footer text-muted">Last Update {lastUpdate}</div>
    </div>
  );
};

export default CovidWorldwide;
