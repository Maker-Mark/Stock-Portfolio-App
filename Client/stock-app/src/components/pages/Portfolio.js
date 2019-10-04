import React, { Component } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";

import Stock from "./Stock";
class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolio: props.stocks,
      arr: [],
      totalValue: 0,
      done: false
    };
  }

  componentDidMount() {
    let tickerArr = this.state.portfolio.map(stk => stk["symbol"]);
    let searchStr = "";
    tickerArr.forEach(tick => {
      searchStr += tick + ",";
    });

    searchStr = searchStr.substr(0, searchStr.length - 1);
    let strArr = searchStr.split(",");
    strArr.filter((v, i, a) => a.indexOf(v) === i);

    //Make a new SET with the given array of stocks
    //We want to do this in order to remove duplicate stocks, and migrate them.
    let tickerSet = [...new Set(strArr)];
    let resArr = [],
      totalTmp = 0;

    //Array of API keys, to minimize api limit (you can make as many as you'd like)
    //All other API's, including Alpha Advantage cost money for more than 5 calls/API key/ Min
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

    // For every stock in our set of ticker symbols, get the daily time series data
    for (let stock of tickerSet) {
      axios(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&apikey=${
          keyArr[parseInt(Math.random() * 8)]
        }&symbol=${stock} `
      )
        .then(res => {
          //Pull out the day's data
          let stockInfo = Object.entries(res.data["Time Series (Daily)"])[0][1];
          //For each stock, keep track of the total value by multiplying how many we have of a stock and the current  price
          let subTotal = 0;
          this.state.portfolio.forEach(currStk => {
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
              totalTmp += subTotal;
            }
          });

          //Set the state with the updated array
          //We need to do this, so that even if the API fails half way through, some data will get set in the component (not ideal :/)
          this.setState({
            arr: resArr,
            totalValue: totalTmp,
            done: true
          });
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
            There's nothing here yet! Do you own any stocks Check your
            transactions...
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
            Alpha Vantage API limit reached.{" "}
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
          <Form.Text className="text-muted ml-5">
            Missing some stocks? API limit may have been reached, try reloading
            in 60 seconds.
          </Form.Text>
        </div>
      );
    }
  }
}
export default Portfolio;
