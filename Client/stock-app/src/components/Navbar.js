import React, { Component } from "react";
import { BrowserRouter as Router, Link, Switch } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const StockNavbar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/home">
          <img
            alt=""
            src="/img/logo512.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          {" Stock Trading App"}
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Link className="nav-link" to="/Portfolio">
            Portfolio
          </Link>
          <Link className="nav-link" to="/Transactions">
            Transactions
          </Link>
        </Nav>
        <Nav>
          <Link className="nav-link" to="/home">
            Logout
          </Link>
        </Nav>
      </Navbar>
    </>
  );
};
export default StockNavbar;
