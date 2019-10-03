import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
// import Button from "react-bootstrap/Button";
import Transaction from "./Transaction";

const Transactions = props => {
  const [trans, setTrans] = useState([]);

  // const { name, email, password } = home;
  //this is going to get the user data from the database
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.replace("/");
    }
    axios("/users/", {
      headers: { "x-auth-token": localStorage.getItem("token") }
    })
      // .then(res => console.log(res))
      .then(res => {
        console.log(res.data.transactions);
        let transArr = res.data.transactions;
        setTrans(transArr);
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
      <h1>Transactions</h1>
      <ul>
        {trans.map(trn => {
          return (
            <Transaction
              price={trn.price}
              ticker={trn.symbol}
              quantity={trn.quantity}
              action={trn.action}
              date={trn.date}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Transactions;
