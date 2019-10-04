import React from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Search from "../Search";
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

    //Make a map to aggregate all the stock purchases you have done in the past
    const myMap = new Map();
    axios("/users/", {
      headers: {
        "x-auth-token": localStorage.getItem("token")
      }
    }).then(response => {
      let stocks = response.data.portfolio.stocks;
      //Store the balance
      localStorage.setItem("bal", response.data["balance"]);
      //For each transaction of the stocks, aggregate it all into one key value pair in the map
      stocks.forEach(trn => {
        //If we have the symbol in the map, update the values
        if (myMap.has(trn.symbol)) {
          myMap.set(trn.symbol, {
            symbol: myMap.get(trn.symbol).symbol,
            quantity:
              parseInt(myMap.get(trn.symbol).quantity) + parseInt(trn.quantity)
          });
          //Otherwise, create and init the key and value pair
        } else {
          myMap.set(trn.symbol, {
            symbol: trn.symbol,
            quantity: parseInt(trn.quantity)
          });
        }
      });

      //Pull out an array of the values from our map
      let newArr = [];
      for (let [key, val] of myMap.entries()) {
        newArr.push(val);
      }
      localStorage.setItem("stocks", newArr);

      //Set the state with our filtered data.
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
