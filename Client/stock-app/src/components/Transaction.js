import Card from "react-bootstrap/Card";
import React, { Component, useEffect, useState } from "react";

import ListGroup from "react-bootstrap/ListGroup";

const Transaction = props => {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card>
          <Card.Body>
            {props.action} {props.quantity} {props.ticker} Stocks @{" "}
            {props.price}
          </Card.Body>
        </Card>
      </Card>
    </>
  );
};

export default Transaction;
