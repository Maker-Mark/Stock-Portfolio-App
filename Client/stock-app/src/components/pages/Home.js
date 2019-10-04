import React from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Search from "../Search";
// import Transaction from "../components/Transaction";
import Buy from "./Buy";
import Portfolio from "./Portfolio";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      stocks: [],
      email: "",
      done: false
    };
  }
  componentDidMount() {
    if (!localStorage.getItem("token")) {
      window.location.replace("/");
    }
    const myMap = new Map();
    axios("/users/", {
      headers: { "x-auth-token": localStorage.getItem("token") }
    }).then(response => {
      let stocks = response.data.portfolio.stocks;
      localStorage.setItem("bal", response.data["balance"]);
      stocks.forEach(trn => {
        if (myMap.has(trn.symbol)) {
          myMap.set(trn.symbol, {
            symbol: myMap.get(trn.symbol).symbol,
            quantity:
              parseInt(myMap.get(trn.symbol).quantity) + parseInt(trn.quantity)
          });
        } else {
          myMap.set(trn.symbol, {
            symbol: trn.symbol,
            quantity: parseInt(trn.quantity)
          });
        }
      });

      let newArr = [];
      for (let [key, val] of myMap.entries()) {
        newArr.push(val);
      }

      localStorage.setItem("stocks", newArr);
      this.setState({
        stocks: newArr,
        email: response.data["email"],
        done: true
      });
    });
  }
  render() {
    if (!this.state.done) {
      return (
        <div>
          <Buy />
        </div>
      );
    } else {
      return (
        <Row>
          <Col>
            <Portfolio className="ml-4" stocks={this.state.stocks} />
          </Col>
          <Col>
            <Buy email={this.state.email} />
          </Col>
          <Col>
            <Search />
          </Col>
        </Row>
      );
    }
  }
}

export default Home;
