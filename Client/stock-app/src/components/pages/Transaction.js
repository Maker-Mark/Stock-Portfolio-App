import Card from "react-bootstrap/Card";
import React from "react";

const Transaction = props => {
  return (
    <div>
      <Card style={{ width: "20rem", margin: "1rem" }}>
        <Card>
          <Card.Body>
            {props.action} {props.quantity} {props.ticker} Stocks @{" "}
            {props.price} {props.date}
          </Card.Body>
        </Card>
      </Card>
    </div>
  );
};

export default Transaction;
