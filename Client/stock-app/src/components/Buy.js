import React, { Component, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/Login.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Buy = props => {
  let emailTmp = props.email;
  console.log(localStorage.getItem("email"));
  const [purchase, setPurchase] = useState({
    symbol: "",
    quantity: "",
    email: localStorage.getItem("email")
  });
  // console.log(purchase);

  console.log("BUY PROPS");
  console.log(props.email);
  const { symbol, quantity, email } = purchase;
  console.log(purchase);

  const onChange = e => {
    setPurchase({ ...purchase, [e.target.name]: e.target.value });
    console.log(purchase);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (purchase.symbol === "" || purchase.quantity === "") {
      console.log(purchase);
      console.log("Please enter all fields danger");
    } else {
      console.log("BEFORE");
      console.log(purchase);
      axios
        .post("users/buy", {
          ticker: purchase.symbol,
          numStocks: purchase.quantity,
          email: purchase.email
        })
        .then(res => {
          console.log(res);
          localStorage.setItem("token", res.data.token);
          window.location.replace("/home");
        })
        .catch(err => console.error("Login Error:" + err.message));
    }
  };

  return (
    <Form className="m-5" onSubmit={onSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Stock Ticker</Form.Label>
        <Form.Control
          name="symbol"
          onChange={onChange}
          type="text"
          placeholder="Enter stock symbol"
          required
        />
        <Form.Text className="text-muted">
          Make sure you reviewed your ticker!
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          name="quantity"
          onChange={onChange}
          type="number"
          placeholder="Number of Stocks"
          required
        />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Remember me" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Buy;
