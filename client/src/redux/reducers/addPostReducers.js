import {
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  ADD_POST_FAIL,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  CLEAR_ADD_POST_REDUCER,
} from "../types/addPostTypes";

export const addPostReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPLOAD_IMAGE_REQUEST:
      return { loadingFile: true, error: null };
    case UPLOAD_IMAGE_SUCCESS:
      return { loadingFile: false, error: null, filePath: payload };
    case UPLOAD_IMAGE_FAIL:
      return { loadingFile: false, error: payload?.message };

    case ADD_POST_REQUEST:
      return { loading: true, error: null };
    case ADD_POST_SUCCESS:
      return { loading: false, error: null, success: payload };
    case ADD_POST_FAIL:
      return { loading: false, error: payload };

    case CLEAR_ADD_POST_REDUCER:
      return { loading: false, error: null };

    default:
      return state;
  }
};
