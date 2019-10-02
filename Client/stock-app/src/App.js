import React, { Fragment } from "react";
import { BrowserRouter as Router, Link, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

const App = () => {
  return (
    <Fragment>
      <Router>
        <Navbar className="nav" />
        <Register />
      </Router>
    </Fragment>
  );
};

export default App;
