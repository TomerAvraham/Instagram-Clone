import {
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  FOLLOW_PROFILE_FAIL,
  FOLLOW_PROFILE_SUCCESS,
  FOLLOW_PROFILE_REQUEST,
  UN_FOLLOW_PROFILE_SUCCESS,
  UN_FOLLOW_PROFILE_REQUEST,
  UN_FOLLOW_PROFILE_FAIL,
  GET_ALL_PROFILE_FAIL,
  GET_ALL_PROFILE_REQUEST,
  GET_ALL_PROFILE_SUCCESS,
  EDIT_PROFILE_DETAILS_SUCCESS,
  EDIT_PROFILE_DETAILS_REQUEST,
  EDIT_PROFILE_DETAILS_FAIL,
} from "../types/profileTypes";

import { configHeaders } from "../../helpers/configHeaders";

const BASE_URL = "http://localhost:5000/api/";

export const getProfileDetails = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PROFILE_REQUEST,
    });

    const res = await fetch(BASE_URL + `profile/${userId}`, {
      method: "GET",
      headers: configHeaders(),
    });

    const data = await res.json();

    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_PROFILE_FAIL,
    });
  }
};

export const followProfile = (profileId) => async (dispatch) => {
  try {
    dispatch({
      type: FOLLOW_PROFILE_REQUEST,
    });

    await fetch(BASE_URL + `profile/follow`, {
      method: "POST",
      headers: configHeaders(),
      body: JSON.stringify({ id: profileId }),
    });

    dispatch({
      type: FOLLOW_PROFILE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: FOLLOW_PROFILE_FAIL,
    });
  }
};

export const unFollowProfile = (profileId) => async (dispatch) => {
  try {
    dispatch({
      type: UN_FOLLOW_PROFILE_REQUEST,
    });

    await fetch(BASE_URL + `profile/unFollow/${profileId}`, {
      method: "DELETE",
      headers: configHeaders(),
    });

    dispatch({
      type: UN_FOLLOW_PROFILE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: UN_FOLLOW_PROFILE_FAIL,
    });
  }
};

export const getAllProfiles = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_PROFILE_REQUEST,
    });

    const res = await fetch(BASE_URL + "profile/all", {
      method: "GET",
      headers: configHeaders(),
    });

    const data = await res.json();

    dispatch({
      type: GET_ALL_PROFILE_SUCCESS,
      payload: data.profiles,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_ALL_PROFILE_FAIL,
    });
  }
};

export const editProfileDetails = (newUsername, newProfileUrl) => async (
  dispatch
) => {
  try {
    dispatch({
      type: EDIT_PROFILE_DETAILS_REQUEST,
    });

    const res = await fetch(BASE_URL + "profile/edit", {
      method: "PUT",
      headers: configHeaders(),
      body: JSON.stringify({
        newUsername,
        newProfileUrl,
      }),
    });
    console.log(res);
    const data = await res.json();
    console.log(data);

    if (res.status >= 400) {
      return dispatch({
        type: EDIT_PROFILE_DETAILS_FAIL,
      });
    }

    dispatch({
      type: EDIT_PROFILE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: EDIT_PROFILE_DETAILS_FAIL,
    });
  }
};
