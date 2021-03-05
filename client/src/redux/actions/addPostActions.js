import {
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  ADD_POST_FAIL,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
} from "../types/addPostTypes";

import { configHeaders } from "../../helpers/configHeaders";
import { changeTypesName } from "../../helpers/changeTypesName";

const BASE_URL = "https://ultragram-mysql.herokuapp.com/api/";

export const uploadImage = (file, path) => async (dispatch) => {
  try {
    dispatch({ type: changeTypesName(UPLOAD_IMAGE_REQUEST) });

    const res = await fetch(BASE_URL + `upload/${path}`, {
      method: "POST",
      body: file,
    });

    const data = await res.json();

    if (res.status >= 400) {
      return dispatch({
        type: changeTypesName(UPLOAD_IMAGE_FAIL),
        payload: data,
      });
    } else {
      dispatch({
        type: changeTypesName(UPLOAD_IMAGE_SUCCESS),
        payload: data.filePath,
      });
    }
  } catch (error) {
    dispatch({
      type: changeTypesName(UPLOAD_IMAGE_FAIL),
    });
  }
};

export const addPost = (userId, filePath) => async (dispatch) => {
  try {
    dispatch({ type: ADD_POST_REQUEST });

    const res = await fetch(BASE_URL + "post/add", {
      method: "POST",
      headers: configHeaders(),
      body: JSON.stringify({ userId, url: filePath }),
    });

    const data = await res.json();

    dispatch({
      type: ADD_POST_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: ADD_POST_FAIL,
      payload: error.message,
    });
  }
};
