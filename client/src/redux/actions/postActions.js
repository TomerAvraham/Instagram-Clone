import {
  GET_POST_FAIL,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  LIKE_POST_FAIL,
  LIKE_POST_SUCCESS,
  LIKE_POST_REQUEST,
  UN_LIKE_POST_FAIL,
  UN_LIKE_POST_REQUEST,
  UN_LIKE_POST_SUCCESS,
  COMMENT_POST_FAIL,
  COMMENT_POST_REQUEST,
  COMMENT_POST_SUCCESS,
} from "../types/postTypes";

import { configHeaders } from "../../helpers/configHeaders";

const BASE_URL = "http://localhost:5000/api/";

export const getAllPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_POST_REQUEST,
    });

    const res = await fetch(BASE_URL + "post/all", {
      method: "GET",
      headers: configHeaders(),
    });

    const data = await res.json();

    if (res.status >= 400) {
      return dispatch({
        type: GET_POST_FAIL,
        payload: data,
      });
    } else {
      dispatch({ type: GET_POST_SUCCESS, payload: data.posts });
    }
  } catch (error) {
    dispatch({
      type: GET_POST_FAIL,
      payload: error,
    });
  }
};

export const likePost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: LIKE_POST_REQUEST,
    });

    const res = await fetch(BASE_URL + "post/like", {
      method: "POST",
      headers: configHeaders(),
      body: JSON.stringify({ postId }),
    });

    const data = await res.json();

    dispatch({
      type: LIKE_POST_SUCCESS,
      payload: { postId, newLike: data.newLike },
    });
  } catch (error) {
    dispatch({
      type: LIKE_POST_FAIL,
      payload: error,
    });
  }
};

export const unlikePost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: UN_LIKE_POST_REQUEST,
    });

    const res = await fetch(BASE_URL + `post/unlike/${postId}`, {
      method: "DELETE",
      headers: configHeaders(),
    });

    const data = await res.json();

    dispatch({
      type: UN_LIKE_POST_SUCCESS,
      payload: { userId: data.userId, postId },
    });
  } catch (error) {
    dispatch({
      type: UN_LIKE_POST_FAIL,
      payload: error,
    });
  }
};

export const commentPost = (postId, comment) => async (dispatch) => {
  try {
    dispatch({
      type: COMMENT_POST_REQUEST,
    });

    const res = await fetch(BASE_URL + "post/comment", {
      method: "POST",
      headers: configHeaders(),
      body: JSON.stringify({ postId, comment }),
    });

    const data = await res.json();


    dispatch({
      type: COMMENT_POST_SUCCESS,
      payload: {
        postId,
        newComment: data.comment,
      },
    });
  } catch (error) {
    dispatch({
      type: COMMENT_POST_FAIL,
      payload: error,
    });
  }
};
