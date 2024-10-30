import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
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
      .post("http://localhost:3001/register", values)
      .then((response) => {
        if (response.status === 201 && response.data === "Success") {
          alert("Registration successful!");
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.data === "Invalid email format") {
            alert("Invalid email format");
          } else if (error.response.data === "Invalid password format") {
            alert("Invalid password format");
          } else if (error.response.data === "Email already in use") {
            alert("Email already in use");
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
        <h2>Signup</h2>
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
            Sign Up
          </button>
          <Link to="/" className="btn btn-default w-100 bg-light">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
