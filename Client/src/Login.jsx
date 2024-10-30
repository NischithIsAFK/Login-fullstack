import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/api/users/login", values)
      .then((response) => {
        if (response.status === 200 && response.data === "Success") {
          alert("Login successful!");
          navigate("/home");
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.data === "Wrong email or password") {
            alert("Invalid email or password");
          } else {
            alert("Error");
          }
        } else {
          alert("Error");
        }
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={handleInput}
              className="form-control rounded-0"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleInput}
              placeholder="Enter Password"
              className="form-control rounded-0"
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
          <Link to="/home" className="btn btn-default w-100 bg-light">
            Create an account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
