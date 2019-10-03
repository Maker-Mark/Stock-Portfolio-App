import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
// import Button from "react-bootstrap/Button";
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
    console.log(strArr);
    strArr.filter((v, i, a) => a.indexOf(v) === i);
    let tickerSet = [...new Set(strArr)];
    // console.log("STR ARR");
    console.log(tickerSet);
    // tickerSet.join(",");
    let resArr = [];
    let totalTmp = 0;
    let key1 = "LP7OHCT0JUHMK0C9",
      key2 = "JXU3KGHTIHMS1TWR";

    //   LP7OHCT0JUHMK0C9 , W1R2GKR6A741MTP0
    for (let stock of tickerSet) {
      axios(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&apikey=${key1}&symbol=${stock} `
      )
        .then(res => {
          //   let stockInfo = Object.entries(res.data["Time Series (Daily)"])[0][1]
          // console.log(Object.entries(res.data["Time Series (Daily)"])[0][1]);
          // let priceArr = [];
          // Array of current prices of stocks
          let stockInfo = Object.entries(res.data["Time Series (Daily)"])[0][1];

          //For each stock, multiply how many we have buy the price

          let subTotal = 0;
          //   let myMap = newMap();
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
  //   LP7OHCT0JUHMK0C9,

  render() {
    if (!this.state.done) {
      return (
        <div>
          <h1 className="mt-4">Portfolio Value : Loading</h1>
        </div>
      );
    } else {
      return (
        <div>
          <h1 className="mt-5">
            Portfolio (${this.state.totalValue.toFixed(2)})
          </h1>
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

// axios(
//   `https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&apikey=W1R2GKR6A741MTP0&symbols=MSFT `
// ).then(res => {
//     // Array of current prices of stocks
//     let priceArr = res.data["Stock Quotes"];
//     let total = 0;
//     //For each stock, multiply how many we have buy the price
//     priceArr.forEach(stk => {
//         let subTotal = 0;
//         numStocks = this.state.portfolio.forEach(stock => {
//             if (stock["symbol"] == stk["1. symbol"]) {
//                 subTotal = 0;
//                 subTotal += stk["2. price"] * stock["quantity"];
//                 console.log(subTotal);
//                 total += subTotal;
//             }
//         });

//         total += parseInt(stk["2. price"]);
//     });

//     console.log(total);

// }
