import React from "react";
import "./css/App.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "leaflet/dist/leaflet.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./components/homePage";
import CountryPage from "./components/countryPage";

class App extends React.Component {
  render() {
    const environment = process.env.REACT_APP_ENV;
    const domain = process.env.REACT_APP_DOMAIN;
    return (
      <div className="App">
        <BrowserRouter basename={environment === "PROD" ? domain : ""}>
          <Routes>
            <Route path="/covid-19/:country" element={<CountryPage />}></Route>
            <Route path="/" element={<HomePage />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
