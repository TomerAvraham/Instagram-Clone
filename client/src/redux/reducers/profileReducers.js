import {
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  FOLLOW_PROFILE_REQUEST,
  FOLLOW_PROFILE_SUCCESS,
  FOLLOW_PROFILE_FAIL,
  UN_FOLLOW_PROFILE_FAIL,
  UN_FOLLOW_PROFILE_REQUEST,
  UN_FOLLOW_PROFILE_SUCCESS,
  GET_ALL_PROFILE_SUCCESS,
  GET_ALL_PROFILE_REQUEST,
  GET_ALL_PROFILE_FAIL,
  EDIT_PROFILE_DETAILS_FAIL,
  EDIT_PROFILE_DETAILS_REQUEST,
  EDIT_PROFILE_DETAILS_SUCCESS,
} from "../types/profileTypes";

import {
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
} from "../types/addPostTypes";

export const profileReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE_REQUEST:
      return { loading: true, error: null };
    case GET_PROFILE_SUCCESS:
      return {
        loading: false,
        error: null,
        profileDetails: payload.profileUserDetails[0],
        posts: payload.profilePosts,
      };
    case GET_PROFILE_FAIL:
      return { loading: false, error: true };

    case FOLLOW_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };
    case FOLLOW_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        profileDetails: {
          ...state.profileDetails,
          isCurrUserFollow: true,
          followers: state.profileDetails.followers + 1,
        },
      };
    case FOLLOW_PROFILE_FAIL:
      return { ...state, loading: false, error: true };
    case UN_FOLLOW_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };
    case UN_FOLLOW_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        profileDetails: {
          ...state.profileDetails,
          isCurrUserFollow: false,
          followers: state.profileDetails.followers - 1,
        },
      };
    case UN_FOLLOW_PROFILE_FAIL:
      return { ...state, loading: false, error: true };

    case `PROFILE_${UPLOAD_IMAGE_REQUEST}`:
      return { ...state, loading: true, error: null };
    case `PROFILE_${UPLOAD_IMAGE_SUCCESS}`:
      return {
        ...state,
        loading: false,
        error: null,
        newProfileImagePath: payload,
      };
    case `PROFILE_${UPLOAD_IMAGE_FAIL}`:
      return { ...state, loading: false, error: true };

    case EDIT_PROFILE_DETAILS_REQUEST:
      return { ...state, loading: true, error: null };
    case EDIT_PROFILE_DETAILS_SUCCESS:
      return {
        loading: false,
        error: null,
        profileDetails: payload.profileUserDetails[0],
        posts: payload.profilePosts,
      };
    case EDIT_PROFILE_DETAILS_FAIL:
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};

export const allProfileReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_PROFILE_REQUEST:
      return { loading: true, error: null };

    case GET_ALL_PROFILE_SUCCESS:
      return { loading: false, error: null, profiles: payload };

    case GET_ALL_PROFILE_FAIL:
      return { loading: false, error: true };

    default:
      return state;
  }
};
