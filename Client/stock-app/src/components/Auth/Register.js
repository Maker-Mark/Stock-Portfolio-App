import React, { Component, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import "../styles/Login.css";
// import { Route, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: ""
  });

  const { name, email, password } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const onSubmit = e => {
    console.log(e);
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      console.log("Please enter all fields danger");
    } else {
      console.log(user);
      axios
        .post("users/register", {
          name: user.name,
          email: user.email,
          password: user.password
        })
        .then(res => {
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          window.location.replace("/home");
        })
        .catch(err => {
          alert(`Email ${user.email} is already in use`);
          console.error("Login Error:" + err.message);
        });
    }
  };

  return (
    <div className="Login">
      <form onSubmit={onSubmit}>
        <h1>Register</h1>
        <hr />

        <Form.Group controlId="formBasic">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            onChange={onChange}
            type="text"
            placeholder="Enter your name"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            onChange={onChange}
            type="email"
            placeholder="Enter email"
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            onChange={onChange}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register My Account
        </Button>
      </form>
    </div>
  );
};

export default Register;
