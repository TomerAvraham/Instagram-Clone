import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGOUT,
} from "../types/userTypes";

import jwt_decode from "jwt-decode";

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { loading: true, isAuth: false };
    case LOGIN_SUCCESS:
      const userInfo = jwt_decode(action.payload);
      return { loading: false, error: null, isAuth: true, userInfo };
    case LOGIN_FAIL:
      return { loading: false, isAuth: false, error: action.payload };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { loading: true, isCreate: false, error: null };
    case REGISTER_SUCCESS:
      return { loading: false, isCreate: true, error: null };
    case REGISTER_FAIL:
      return { loading: false, isCreate: false, error: action.payload };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};
