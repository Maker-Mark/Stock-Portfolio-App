import Card from "react-bootstrap/Card";
import React from "react";

// import ListGroup from "react-bootstrap/ListGroup";

const Stock = props => {
  if (props.trend > 0) {
    return (
      <Card
        className="text-center mb-3"
        style={{
          width: "34rem",
          color: "blue",
          fontSize: "18px",
          fontWeight: "bold"
        }}
      >
        <Card>
          <Card.Body>
            + You own {props.quantity} {props.ticker} Stocks, currently valued
            at {props.val}
          </Card.Body>
        </Card>
      </Card>
    );
  } else if (props.trend < 0) {
    return (
      <Card
        className="text-center mb-3"
        style={{
          width: "34rem",
          color: "red",
          fontSize: "18px",
          fontWeight: "bold"
        }}
      >
        <Card>
          <Card.Body>
            - You own {props.quantity} {props.ticker} Stocks valued at{" "}
            {props.val}
          </Card.Body>
        </Card>
      </Card>
    );
  } else {
    return (
      <Card
        className="text-center mb-3"
        style={{
          width: "34rem",
          color: "gray",
          fontSize: "18px",
          fontWeight: "bold"
        }}
      >
        <Card>
          <Card.Body>
            = You own {props.quantity} {props.ticker} Stocks valued at{" "}
            {props.val}
          </Card.Body>
        </Card>
      </Card>
    );
  }
};

export default Stock;
