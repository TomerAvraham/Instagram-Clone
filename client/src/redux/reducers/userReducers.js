import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGOUT,
  ACCESS_TOKEN_FAIL,
  ACCESS_TOKEN_SUCCESS,
  ACCESS_TOKEN_REQUEST,
} from "../types/userTypes";

import jwt_decode from "jwt-decode";

export const loginReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_REQUEST:
      return { loading: true, isAuth: false };
    case LOGIN_SUCCESS:
      const userInfo = jwt_decode(payload);
      return { loading: false, error: null, isAuth: true, userInfo };
    case LOGIN_FAIL:
      return { loading: false, isAuth: false, error: payload };
    case ACCESS_TOKEN_REQUEST:
      return { loading: true, ...state };
    case ACCESS_TOKEN_SUCCESS:
      const userInfoFromNewToken = jwt_decode(payload);
      return {
        loading: false,
        isAuth: true,
        error: null,
        userInfo: userInfoFromNewToken,
      };
    case ACCESS_TOKEN_FAIL:
      return { loading: false, isAuth: false, error: true };
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
