import Card from "react-bootstrap/Card";
import React from "react";

const Stock = props => {
  if (props.trend > 0) {
    return (
      <Card
        className="text-center mb-3"
        style={{
          width: "100%",
          color: "green",
          fontSize: "18px",
          fontWeight: "bold"
        }}
      >
        <Card>
          <Card.Body>
            + You own {props.quantity} {props.ticker} Stocks, currently valued
            at {props.val.toFixed(2)}
          </Card.Body>
        </Card>
      </Card>
    );
  } else if (props.trend < 0) {
    return (
      <Card
        className="text-center mb-3"
        style={{
          width: "100%",
          color: "red",
          fontSize: "18px",
          fontWeight: "bold"
        }}
      >
        <Card>
          <Card.Body>
            - You own {props.quantity} {props.ticker} Stocks valued at{" "}
            {props.val.toFixed(2)}
          </Card.Body>
        </Card>
      </Card>
    );
  } else {
    return (
      <Card
        className="text-center mb-3"
        style={{
          width: "100%",
          color: "gray",
          fontSize: "18px",
          fontWeight: "bold"
        }}
      >
        <Card>
          <Card.Body>
            = You own {props.quantity} {props.ticker} Stocks valued at{" "}
            {props.val.toFixed(2)}
          </Card.Body>
        </Card>
      </Card>
    );
  }
};

export default Stock;
