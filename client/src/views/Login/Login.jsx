import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Login.css";
import { login } from "../../redux/actions/userActions";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formData, setFormData] = useState({});

  const userLogin = useSelector((state) => state.userLogin);
  const { error, isAuth, loading } = userLogin;

  const handelChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuth) {
      history.push("/");
    }
  }, [isAuth, history]);

  return (
    <>
      {error && <Message message={error} />}
      <div className="login-wrapper">
        {loading && <Loader />}
        <form onSubmit={(e) => handelSubmit(e)} className="login-form">
          <h1 className="form-header">UltraGram</h1>
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
    </>
  );
};

export default Login;
