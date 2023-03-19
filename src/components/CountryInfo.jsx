import React, { Component } from "react";
import "../css/CountryInfo.css";

class CountryInfo extends Component {
  render() {
    
    return (
      <React.Fragment>
        <div className="country-data card invisible" id="card">
          <div className="card-header bg-transparent">
            <h3 id="name">{""}</h3>
          </div>
          <img className="card-img-top" id="flag" alt="flag-img"></img>
          <div className="card-body">
            <h5>
              Capital : <span id="capital"></span>
            </h5>
            <h5>
              Population : <span id="population"></span>
            </h5>
            <h5>
              Language : <span id="language"></span>
            </h5>
            <h5>
              Currency : <span id="currency"></span>
            </h5>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CountryInfo;
