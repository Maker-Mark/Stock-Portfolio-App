import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
const StockNavbar = () => {
  //Log the user out by clearing the JSON web token
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
        <Nav className="mr-auto" href>
          <Link className="nav-link" to="/home">
            Portfolio
          </Link>
          <Link className="nav-link" to="/Transactions">
            Transactions
          </Link>
        </Nav>
        <Nav>
          {localStorage.getItem("token") ? (
            <Link to="/home">
              {" "}
              <Button
                onClick={logout}
                className="nav-link"
                style={{ color: "white", width: "100px" }}
                to="/home"
              >
                Logout
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button className="nav-link" style={{ color: "white" }}>
                Login/Register
              </Button>
            </Link>
          )}
        </Nav>
      </Navbar>
    </>
  );
};
export default StockNavbar;
