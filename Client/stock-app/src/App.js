import React, { Fragment } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import "./App.css";
import Transactions from "./components/Transactions";

const App = () => {
  return (
    <Fragment>
      <Router>
        <Navbar className="nav" />
        <Route exact path="/" component={Register} />
        {/* <Route exact path="/login" component={Login} /> */}
        <Route exact path="/home" component={Home} />
        <Route exact path="/transactions" component={Transactions} />
      </Router>
    </Fragment>
  );
};

export default App;
