import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Transaction from "../components/Transaction";

const Home = props => {
  const [trans, setTrans] = useState([]);

  // const { name, email, password } = home;
  //this is going to get the user data from the database
  useEffect(() => {
    axios("/users/", {
      headers: { "x-auth-token": localStorage.getItem("token") }
    })
      // .then(res => console.log(res))
      .then(res => {
        console.log(res.data.portfolio.stocks);
        let stockArr = res.data.portfolio.stocks;
        let total = 0;
        console.log("STK ARR");
        console.log(stockArr);

        axios(
          `https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&apikey=W1R2GKR6A741MTP0&symbols=MSFT,AAPL,FB`
        ).then(res => {
          // Array of current prices of stocks
          let priceArr = res.data["Stock Quotes"];
          //For each stock, multiply how many we have buy the price
          priceArr.forEach(stk => {
            let subTotal = 0;
            console.log(stk);
            let numStocks = [];
            numStocks = stockArr.forEach(stock => {
              if (stock["symbol"] == stk["1. symbol"]) {
                subTotal = 0;
                subTotal += stk["2. price"] * stock["quantity"];
                // console.log(stock);
                console.log(subTotal);
                total += subTotal;
              }
            });

            // total += parseInt(stk["2. price"]);
          });
          // total += parseInt(price);
          console.log(total);
        });

        // stockArr.forEach((stk)=>{
      })

      //If we dont have a token
      .catch(error => {
        console.error(error.message);
      });
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <div>
      <h1>Portfolio</h1>
      <hr></hr>
      <Button onClick={logout}>Logout </Button>

      <ul>
        {trans.map(trn => {
          return (
            <Transaction
              price={trn.price}
              ticker={trn.symbol}
              quantity={trn.quantity}
              action={trn.action}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
