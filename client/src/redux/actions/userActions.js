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
        payload: data,
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
