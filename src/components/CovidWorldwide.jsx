import React, { useState, useEffect } from "react";
import { timeConverter } from "../services/countries";
import "../css/CovidWorldwide.css";
import CountUp from "react-countup";
import axios from "axios";

const CovidWorldwide = () => {
  const [confirmed, setConfirmed] = useState(0);
  const [recovered, setRecovered] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(0);

  useEffect(() => {
    async function worldwideData() {
      const url = "https://corona.lmao.ninja/v2/all";
      const result = axios
        .get(url)
        .then((res) => {
          //console.log(res.data);
          setConfirmed(res.data.cases);
          setRecovered(res.data.recovered);
          setDeaths(res.data.deaths);
          setLastUpdate(timeConverter(res.data.updated));
        })
        .catch((err) => console.log(err));

      return result;
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
