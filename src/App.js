import React from "react";
import "./css/App.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "leaflet/dist/leaflet.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/homePage";
import CountryPage from "./components/countryPage";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path="/covid-19/:country" element={<CountryPage/>}></Route>
          <Route path="/" element={<HomePage/>}></Route>
        </Routes>
      </div>
    );
  }
}

export default App;
