import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
const StockNavbar = () => {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

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
          {localStorage.getItem("token") ? (
            <Button onClick={logout} className="nav-link" to="/home">
              Logout
            </Button>
          ) : (
            <Button href="/login" className="nav-link" to="/login">
              Login/Register
            </Button>
          )}
        </Nav>
      </Navbar>
    </>
  );
};
export default StockNavbar;
