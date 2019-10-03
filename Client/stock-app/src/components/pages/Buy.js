import React, { Component, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/Login.css";
import axios from "axios";
// import { Link } from "react-router-dom";

const Buy = props => {
  console.log(localStorage.getItem("email"));
  console.log(props);
  const [purchase, setPurchase] = useState({
    symbol: "",
    quantity: "",
    email: props.email,
    currBal: 0
  });

  //Destructure  the data from the purchase
  const { symbol, quantity, email } = purchase;
  // useEffect(() => {
  //   axios
  //     .get("/users")
  //     .then(res => {
  //       console.log(res);
  //       localStorage.setItem("bal", res.data["balance"]);
  //     })
  //     .catch(err => console.error("Login Error:" + err.message));
  // }, []);

  const onChange = e => {
    setPurchase({ ...purchase, [e.target.name]: e.target.value });
    console.log(purchase);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (purchase.symbol === "" || purchase.quantity === "") {
      console.log("Please enter all fields danger");
    } else {
      axios
        .post(
          "users/buy",
          {
            ticker: symbol,
            numStocks: quantity,
            email: email
          },
          { headers: { "x-auth-token": localStorage.getItem("token") } }
        )
        .then(res => {
          window.location.replace("/home");
        })
        .catch(err => console.error("Login Error:" + err.message));
    }
  };

  return (
    <Form className="m-5" onSubmit={onSubmit}>
      <Form.Group controlId="formBasicEmail">
        <h1> Cash ${localStorage.getItem("bal")}</h1>
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

      <Button variant="primary" type="submit">
        BUY
      </Button>
    </Form>
  );
};

export default Buy;
