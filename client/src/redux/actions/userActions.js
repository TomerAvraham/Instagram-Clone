import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  ACCESS_TOKEN_FAIL,
  ACCESS_TOKEN_REQUEST,
  ACCESS_TOKEN_SUCCESS,
} from "../types/userTypes";

import { configHeaders } from "../../helpers/configHeaders";

const BASE_URL = "https://ultragram-mysql.herokuapp.com/api/";

export const login = ({ username, password }) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const res = await fetch(BASE_URL + "auth/login", {
      method: "POST",
      headers: configHeaders(),
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.status >= 400) {
      return dispatch({
        type: LOGIN_FAIL,
        payload: data.message,
      });
    }

    localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
    localStorage.setItem("accessToken", JSON.stringify(data.accessToken));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.accessToken,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: LOGIN_FAIL,
      payload: error,
    });
  }
};

export const register = (newUser) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST,
    });

    const res = await fetch(BASE_URL + "auth/register", {
      method: "POST",
      headers: configHeaders(),
      body: JSON.stringify(newUser),
    });

    const data = await res.json();

    if (res.status >= 400) {
      return dispatch({
        type: REGISTER_FAIL,
        payload: data.message,
      });
    }

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  dispatch({ type: LOGOUT });
  document.location.href = "/login";
};

export const getAccessToken = () => async (dispatch) => {
  try {
    dispatch({ type: ACCESS_TOKEN_REQUEST });

    const refreshToken = localStorage.getItem("refreshToken")
      ? JSON.parse(localStorage.getItem("refreshToken").toString())
      : null;

    if (refreshToken === null) {
      return dispatch({
        type: ACCESS_TOKEN_FAIL,
        payload: "Login again please",
      });
    }

    const res = await fetch(BASE_URL + "auth/token", {
      method: "POST",
      headers: configHeaders(),
      body: JSON.stringify({ refreshToken }),
    });

    const data = await res.json();
    localStorage.setItem("accessToken", JSON.stringify(data.accessToken));

    dispatch({
      type: ACCESS_TOKEN_SUCCESS,
      payload: data.accessToken,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ACCESS_TOKEN_FAIL,
    });
  }
};
