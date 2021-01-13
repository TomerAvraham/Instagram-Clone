import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import femaleProfile from "../../images/female_profile.jpg";
import maleProfile from "../../images/male_profile.jpg";
import otherProfile from "../../images/other_profile.gif";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import "./Register.css";
import Loader from "../../components/Loader/Loader";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [checked, setChecked] = useState(false);

  const handelChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(formData);
  };

  const handelCheckedBox = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <>
      <Loader />
      <div className="register-wrapper">
        <form className="register-form">
          <h1 className="form-header">Instagram</h1>
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
                value={femaleProfile}
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value={maleProfile}
                control={<Radio />}
                label="Male"
              />
              <FormControlLabel
                value={otherProfile}
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </div>
          <Button
            type="submit"
            id="submit-button"
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
          <p>
            Already have account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
