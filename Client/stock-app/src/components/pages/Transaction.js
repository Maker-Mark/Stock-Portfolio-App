import Card from "react-bootstrap/Card";
import React from "react";

import ListGroup from "react-bootstrap/ListGroup";

const Transaction = props => {
  return (
    <>
      <Card style={{ width: "20rem", margin: "1rem" }}>
        <Card>
          <Card.Body>
            {props.action} {props.quantity} {props.ticker} Stocks @{" "}
            {props.price} {props.date}
          </Card.Body>
        </Card>
      </Card>
    </>
  );
};

export default Transaction;
