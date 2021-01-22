import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { Link, useHistory } from "react-router-dom";
import "./Register.css";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CheckIcon from "@material-ui/icons/Check";
import Fab from "@material-ui/core/Fab";
import ClearIcon from "@material-ui/icons/Clear";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../redux/actions/userActions";
import Message from "../../components/Message/Message";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(2),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  buttonFail: {
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formData, setFormData] = useState({});
  const [checked, setChecked] = useState(false);

  const handelChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handelCheckedBox = (e) => {
    setChecked(e.target.checked);
  };

  const userRegister = useSelector((state) => state.userRegister);
  const { error, isCreate, loading } = userRegister;

  const classes = useStyles();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: isCreate,
    [classes.buttonFail]: error,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  const renderFabIcons = () => {
    if (isCreate && !error) {
      return <CheckIcon />;
    } else if (!isCreate && error) {
      return <ClearIcon />;
    } else {
      return <AccountCircleIcon />;
    }
  };

  useEffect(() => {
    if (isCreate) {
      setTimeout(() => {
        history.push("/login");
      }, 3000);
    }
  }, [isCreate, history]);

  return (
    <>
      {isCreate || error ? (
        <Message
          message={error ? error : "User created successfully, Login now"}
          isGreen={isCreate}
        />
      ) : null}
      <div className="register-wrapper">
        <form onSubmit={(e) => handleSubmit(e)} className="register-form">
          <div className={classes.root}>
            <div className={classes.wrapper}>
              <Fab
                aria-label="save"
                color="primary"
                className={buttonClassname}
              >
                {renderFabIcons()}
              </Fab>
              {loading && (
                <CircularProgress size={68} className={classes.fabProgress} />
              )}
            </div>
          </div>

          <TextField
            onChange={(e) => handelChange(e)}
            name="username"
            className="text-input"
            label="Username"
            variant="outlined"
            size="small"
          />
          <br />
          <TextField
            onChange={(e) => handelChange(e)}
            name="email"
            className="text-input"
            label="Email"
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
            size="small"
            type={checked ? "text" : "password"}
          />
          <br />
          <TextField
            onChange={(e) => handelChange(e)}
            name="confirmPassword"
            className="text-input"
            label="Confirm Password"
            variant="outlined"
            size="small"
            type={checked ? "text" : "password"}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handelCheckedBox}
                color="primary"
              />
            }
            label="Show Password"
          />

          <div className="gender-radio">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              name="profilePhotoUrl"
              onChange={(e) => handelChange(e)}
              aria-label="gender"
            >
              <FormControlLabel
                value="/uploads/profileImages/female_profile.jpg"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="/uploads/profileImages/male_profile.jpg"
                control={<Radio />}
                label="Male"
              />
              <FormControlLabel
                value="/uploads/profileImages/other_profile.gif"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </div>
          <div className={classes.wrapper}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={buttonClassname}
              disabled={loading}
            >
              SIGN UP
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
          <p>
            Already have account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
