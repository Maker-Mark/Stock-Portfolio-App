import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/Login.css";
import { Link } from "react-router-dom";

const Register = () => {
  //   this.state = {
  //     location: "",
  //     email: "",
  //     password: "",
  //     retype: ""
  //   };

  const formHandler = e => {
    console.log(this.state[e.target.id]);
    this.setState({ [e.target.id]: e.target.value });
  };

  //   const submitHandler = () => {
  //     sessionStorage.setItem("price", 4);
  //     sessionStorage.setItem("coffee", "black");
  //     //this sends the information to the sign up api
  //     const { location, email, password, retype } = this.state;

  //     if (password === retype) {
  //       axios
  //         .post("https://local-roasters-api.herokuapp.com/users/signup", {
  //           email: email,
  //           password: password,
  //           location: location,
  //           coffee: sessionStorage.getItem("coffee"),
  //           price: sessionStorage.getItem("price")
  //         })
  //         .then(res => localStorage.setItem("token", res.data.token))
  //         .then(() => this.props.history.push("/dashboard"))
  //         .catch(error => console.log(error));
  //     } else {
  //       alert("The passwords do not match");
  //     }
  //   };

  return (
    <Form className="m-5">
      <Form.Group controlId="formBasic">
        <Form.Label>Name</Form.Label>
        <Form.Control
          value={this.state.name}
          onChange={e => this.formHandler(e)}
          type="text"
          placeholder="Enter your name"
          required
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value={this.state.email}
          onChange={e => this.formHandler(e)}
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
          value={this.state.email}
          onChange={e => this.formHandler(e)}
          type="password"
          placeholder="Password"
          required
        />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Remember me" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Login;
