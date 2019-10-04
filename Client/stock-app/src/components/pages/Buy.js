import React, { Component, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

const Buy = props => {
  const [purchase, setPurchase] = useState({
    symbol: "",
    quantity: "",
    email: props.email,
    currBal: 0
  });

  //Destructure  the data from the purchase
  const { symbol, quantity, email } = purchase;

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
          if (res.data["msg"]) {
            alert("You don't have enough cash for this purchase");
          } else if (!res.data) {
            alert("API limit reached, try in 60 seconds");
          }
          window.location.replace("/home");
        })
        .catch(err => console.error("Login Error:" + err.message));
    }
  };

  return (
    <Form className="m-5" onSubmit={onSubmit}>
      <Form.Group controlId="formBasicEmail">
        <h1> Cash ${parseInt(localStorage.getItem("bal")).toFixed(2)}</h1>
        <hr></hr>
        <Form.Label style={{ fontSize: "18px" }}>Ticker Symbol</Form.Label>

        <Form.Control
          name="symbol"
          onChange={onChange}
          type="text"
          placeholder="Enter Ticker Symbol"
          size="lg"
          required
        />
        <Form.Text className="text-muted" style={{ fontSize: "18px" }}>
          Make sure you review your ticker symbol!
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label style={{ fontSize: "18px" }}>Quantity</Form.Label>
        <Form.Control
          name="quantity"
          onChange={onChange}
          type="number"
          min="0"
          placeholder="Number of Stocks"
          size="lg"
          required
        />
      </Form.Group>

      <Button variant="danger" type="submit">
        Buy Stocks
      </Button>
      <Form.Text className="text-muted" style={{ fontSize: "14px" }}>
        Button not working? Try again in 60 seconds. API limit reached.
      </Form.Text>
    </Form>
  );
};

export default Buy;
