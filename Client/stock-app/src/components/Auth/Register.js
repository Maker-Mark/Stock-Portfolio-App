import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: ""
  });

  //Pull out the data from the user state
  const { name, email, password } = user;

  //Handle change
  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  //On submit, call the backend API
  const onSubmit = e => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      console.log("Please enter all fields danger");
    } else {
      axios
        .post("users/register", {
          name: user.name,
          email: user.email,
          password: user.password
        })
        .then(res => {
          localStorage.setItem("token", res.data.token);
          window.location.replace("/home");
        })
        .catch(err => {
          alert(`Email ${user.email} is already in use`);
          console.error("Login Error:" + err.message);
        });
    }
  };

  if (!localStorage.getItem("token")) {
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

          <Button variant="primary" type="submit" className="mb-2">
            Register my account and login
          </Button>
          <Link to="/login">
            <Button variant="outline-primary" type="submit">
              Already signed up? Login here
            </Button>
          </Link>
        </form>
      </div>
    );
  } else {
    window.location.replace("/home");
    return <div></div>;
  }
};

export default Register;
