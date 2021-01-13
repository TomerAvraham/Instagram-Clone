import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Login.css";
import { login } from "../../redux/actions/userActions";

const Login = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});

  const handelChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={(e) => handelSubmit(e)} className="login-form">
        <h1 className="form-header">Instagram</h1>
        <TextField
          onChange={(e) => handelChange(e)}
          name="username"
          className="text-input"
          label="Username or Email"
          variant="outlined"
          size="small"
        />
        <br />
        <TextField
          onChange={(e) => handelChange(e)}
          name="password"
          className="text-input"
          label="Password"
          variant="outlined"
          type="password"
          size="small"
        />
        <br />
        <Button
          type="submit"
          id="submit-button"
          variant="contained"
          color="primary"
        >
          Sign Up
        </Button>
        <p>
          Don't have account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
