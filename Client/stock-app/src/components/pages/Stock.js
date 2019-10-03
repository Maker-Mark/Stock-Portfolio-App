import Card from "react-bootstrap/Card";
import React from "react";

// import ListGroup from "react-bootstrap/ListGroup";

const Stock = props => {
  if (props.trend > 0) {
    return (
      <Card style={{ width: "18rem", color: "blue" }}>
        <Card>
          <Card.Body>
            {props.quantity} {props.ticker} Stocks valued at {props.val}
          </Card.Body>
        </Card>
      </Card>
    );
  } else if (props.trend < 0) {
    return (
      <Card style={{ width: "18rem", color: "red" }}>
        <Card>
          <Card.Body>
            {props.quantity} {props.ticker} Stocks valued at {props.val}
          </Card.Body>
        </Card>
      </Card>
    );
  } else {
    return (
      <Card style={{ width: "18rem", color: "gray" }}>
        <Card>
          <Card.Body>
            {props.quantity} {props.ticker} Stocks valued at {props.val}
          </Card.Body>
        </Card>
      </Card>
    );
  }
};

export default Stock;
