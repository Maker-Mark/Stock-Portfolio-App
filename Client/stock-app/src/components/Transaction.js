import Card from "react-bootstrap/Card";
import React, { Component, useEffect, useState } from "react";

import ListGroup from "react-bootstrap/ListGroup";

const Transaction = props => {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Header>Featured</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>{props.price}</ListGroup.Item>
          <ListGroup.Item>{props.ticker}</ListGroup.Item>
          <ListGroup.Item>{props.quantity}</ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
};

export default Transaction;
