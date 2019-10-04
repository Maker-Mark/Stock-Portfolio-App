import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";

// import Transaction from "../components/Transaction";
import Stock from "./Stock";
class Portfolio extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      portfolio: props.stocks,
      arr: [],
      totalValue: 0,
      done: false
    };
  }

  componentDidMount() {
    // let val = parseInt(res.data.portfolio["totalValue"]);
    let tickerArr = this.state.portfolio.map(stk => stk["symbol"]);
    let searchStr = "";
    tickerArr.forEach(tick => {
      searchStr += tick + ",";
    });
    searchStr = searchStr.substr(0, searchStr.length - 1);
    let strArr = searchStr.split(",");
    // console.log(strArr);
    strArr.filter((v, i, a) => a.indexOf(v) === i);
    let tickerSet = [...new Set(strArr)];
    // console.log("STR ARR");
    // console.log(tickerSet);
    // tickerSet.join(",");
    let resArr = [];
    let totalTmp = 0;
    let keyArr = [
      "0EX3ARX88UZQUM6S",
      "AROSSVE5EUMIFC2R",
      "6H07TY259E6KEHOB",
      "C2WWKDFUHBF8U3Y5",
      "L6ANE8LWW6JC86IS",
      "H9T98BB8N5I98JP3",
      "VWV1SPC91RD4DF6N",
      "P6M5XDBD1ZABM0R3",
      "0EX3ARX88UZQUM6S",
      "AROSSVE5EUMIFC2R",
      "6H07TY259E6KEHOB",
      "C2WWKDFUHBF8U3Y5",
      "L6ANE8LWW6JC86IS",
      "H9T98BB8N5I98JP3",
      "VWV1SPC91RD4DF6N",
      "P6M5XDBD1ZABM0R3"
    ];

    //   LP7OHCT0JUHMK0C9 , W1R2GKR6A741MTP0
    for (let stock of tickerSet) {
      axios(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&apikey=${
          keyArr[parseInt(Math.random() * 8)]
        }&symbol=${stock} `
      )
        .then(res => {
          console.log(keyArr.length);

          let stockInfo = Object.entries(res.data["Time Series (Daily)"])[0][1];
          //For each stock, multiply how many we have buy the price
          let subTotal = 0;
          this.state.portfolio.forEach(currStk => {
            console.log(stock + currStk.symbol);
            if (currStk.symbol == stock) {
              subTotal = 0;
              console.log(stockInfo["4. close"]);
              resArr.push({
                symbol: currStk.symbol,
                val: stockInfo["4. close"] * currStk.quantity,
                quantity: currStk.quantity,
                trend: stockInfo["4. close"] - stockInfo["1. open"]
              });
              subTotal += stockInfo["4. close"] * currStk["quantity"];
              console.log(subTotal);
              totalTmp += subTotal;
            }
          });
          console.log(resArr);
          this.setState({ arr: resArr, totalValue: totalTmp, done: true });
          console.log(totalTmp);
          console.log(resArr);
        })
        .catch(er => console.error(er.message));
    }
  }

  render() {
    if (!this.state.done) {
      return (
        <div className="ml-4">
          <h1 className="mt-5 ml-4 ">Portfolio Value</h1>
          <hr></hr>
          <p>
            There's nothing here yet! Do you own any stocks (check your
            transactions!).
          </p>
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />
          <Spinner animation="grow" variant="warning" />
          <Spinner animation="grow" variant="info" />
          <Spinner animation="grow" variant="dark" />
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="warning" />
          <Form.Text className="text-muted">
            Still loading? Try reloading in 60 seconds.
          </Form.Text>
          <Form.Text className="text-muted">
            Alpha Vantage API limit reached :({" "}
          </Form.Text>
        </div>
      );
    } else {
      return (
        <div className="ml-4">
          <h1 className="mt-5 ml-4 ">
            Portfolio (${this.state.totalValue.toFixed(2)})
          </h1>
          <hr></hr>
          <ul>
            {this.state.arr.map(stk => {
              return (
                <Stock
                  ticker={stk.symbol}
                  quantity={stk.quantity}
                  val={stk.val}
                  trend={stk.trend}
                  totalVal={this}
                />
              );
            })}
          </ul>
        </div>
      );
    }
  }
}
export default Portfolio;
