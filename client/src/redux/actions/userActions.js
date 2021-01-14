import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../types/userTypes";

const BASE_URL = "http://localhost:5000/api/";

export const login = ({ username, password }) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const res = await fetch(BASE_URL + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
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
