import React, { useEffect, useState } from "react";
import axios from "axios";
import Transaction from "./Transaction";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

const Transactions = props => {
  const [trans, setTrans] = useState([]);

  // const { name, email, password } = home;
  //this is going to get the user data from the database
  useEffect(() => {
    //If we are not logged in and try to access this page, redirect to home
    if (!localStorage.getItem("token")) {
      window.location.replace("/");
    }
    axios("/users/", {
      headers: { "x-auth-token": localStorage.getItem("token") }
    })
      .then(res => {
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
    <Container className="mt-5">
      <h1>Transactions</h1>
      <hr></hr>
      <Row>
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
      </Row>
    </Container>
  );
};

export default Transactions;
