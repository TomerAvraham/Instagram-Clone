import {
  GET_POST_FAIL,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_LIKED_POST_FAIL,
  GET_LIKED_POST_REQUEST,
  GET_LIKED_POST_SUCCESS,
  LIKE_POST_FAIL,
  LIKE_POST_SUCCESS,
  LIKE_POST_REQUEST,
  UN_LIKE_POST_FAIL,
  UN_LIKE_POST_REQUEST,
  UN_LIKE_POST_SUCCESS,
  COMMENT_POST_FAIL,
  COMMENT_POST_REQUEST,
  COMMENT_POST_SUCCESS,
  DELETE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  SINGLE_POST_FAIL,
  SINGLE_POST_REQUEST,
  SINGLE_POST_SUCCESS,
} from "../types/postTypes";

import { configHeaders } from "../../helpers/configHeaders";
import { changeTypesName } from "../../helpers/changeTypesName";

const BASE_URL = "https://ultragram-mysql.herokuapp.com/api/";

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
    });
  }
};

export const getAllLikedPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_LIKED_POST_REQUEST,
    });

    const res = await fetch(BASE_URL + "post/allByLike", {
      method: "GET",
      headers: configHeaders(),
    });

    const data = await res.json();

    if (res.status >= 400) {
      return dispatch({
        type: GET_LIKED_POST_FAIL,
        payload: data,
      });
    } else {
      dispatch({ type: GET_LIKED_POST_SUCCESS, payload: data.posts });
    }
  } catch (error) {
    dispatch({
      type: GET_LIKED_POST_FAIL,
    });
  }
};

export const likePost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: changeTypesName(LIKE_POST_REQUEST),
    });

    const res = await fetch(BASE_URL + "post/like", {
      method: "POST",
      headers: configHeaders(),
      body: JSON.stringify({ postId }),
    });

    const data = await res.json();

    dispatch({
      type: changeTypesName(LIKE_POST_SUCCESS),
      payload: { postId, newLike: data.newLike },
    });
  } catch (error) {
    dispatch({
      type: changeTypesName(LIKE_POST_FAIL),
    });
  }
};

export const unlikePost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: changeTypesName(UN_LIKE_POST_REQUEST),
    });

    const res = await fetch(BASE_URL + `post/unlike/${postId}`, {
      method: "DELETE",
      headers: configHeaders(),
    });

    const data = await res.json();

    dispatch({
      type: changeTypesName(UN_LIKE_POST_SUCCESS),
      payload: { userId: data.userId, postId },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: changeTypesName(UN_LIKE_POST_FAIL),
    });
  }
};

export const commentPost = (postId, comment) => async (dispatch) => {
  try {
    dispatch({
      type: changeTypesName(COMMENT_POST_REQUEST),
    });

    const res = await fetch(BASE_URL + "post/comment", {
      method: "POST",
      headers: configHeaders(),
      body: JSON.stringify({ postId, comment }),
    });

    const data = await res.json();

    dispatch({
      type: changeTypesName(COMMENT_POST_SUCCESS),
      payload: {
        postId,
        newComment: data.comment,
      },
    });
  } catch (error) {
    dispatch({
      type: changeTypesName(COMMENT_POST_FAIL),
    });
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: changeTypesName(DELETE_POST_REQUEST),
    });

    await fetch(BASE_URL + `post/delete/${postId}`, {
      method: "DELETE",
      headers: configHeaders(),
    });

    dispatch({
      type: changeTypesName(DELETE_POST_SUCCESS),
      payload: postId,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: changeTypesName(DELETE_POST_FAIL),
    });
  }
};

export const getSinglePost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: SINGLE_POST_REQUEST,
    });

    const res = await fetch(BASE_URL + `post/singlePost/${postId}`, {
      method: "GET",
      headers: configHeaders(),
    });

    const data = await res.json();

    dispatch({
      type: SINGLE_POST_SUCCESS,
      payload: data.singlePost,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SINGLE_POST_FAIL,
    });
  }
};
