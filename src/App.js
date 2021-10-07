import React from "react";
import "./css/App.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "leaflet/dist/leaflet.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/homePage";
import CountryPage from "./components/countryPage";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/covid-19/:country" component={CountryPage}></Route>
          <Route path="/" component={HomePage}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
