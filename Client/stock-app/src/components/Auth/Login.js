import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Container from "react-bootstrap/Container";

import axios from "axios";
import "./form.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // console.log(user);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      console.log("Please enter all fields danger");
    } else {
      console.log(user.email);
      console.log(user.password);
      console.log("L");
      axios
        .post("users/login", {
          email: user.email,
          password: user.password
        })
        .then()
        .then(res => {
          console.log("EJ:");
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          window.location.replace("/home");
        })
        .catch(err => console.error("Login Error:" + err.message));
    }
  };

  return (
    <div className="Login">
      <form onSubmit={onSubmit}>
        <h1>Login</h1>
        <hr></hr>
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
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <ButtonToolbar>
          <Button
            onSubmit={onSubmit}
            variant="primary"
            type="submit"
            className="mr-3"
            size="lg"
          >
            Login
          </Button>
          <Button
            href="/"
            onSubmit={onSubmit}
            variant="outline-primary"
            size="lg"
          >
            Register
          </Button>
        </ButtonToolbar>
      </form>
    </div>
  );
};

export default Login;
