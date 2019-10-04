import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/pages/Home";
import Transactions from "./components/pages/Transactions";

const App = () => {
  return (
    <Fragment>
      <Router>
        <Navbar className="nav" />
        <Route exact path="/" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/transactions" component={Transactions} />
      </Router>
    </Fragment>
  );
};

export default App;
