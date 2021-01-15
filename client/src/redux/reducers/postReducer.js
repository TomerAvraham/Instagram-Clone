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

export const postsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_POST_REQUEST:
      return {
        loading: true,
        posts: [],
        error: null,
      };

    case GET_POST_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
        error: null,
      };

    case GET_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LIKE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LIKE_POST_SUCCESS:
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.postId
      );
      state.posts[index].likes.push(action.payload.newLike);
      return {
        ...state,
        loading: false,
        error: null,
      };

    case LIKE_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UN_LIKE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UN_LIKE_POST_SUCCESS:
      const indexOf = state.posts.findIndex(
        (post) => post.id === action.payload.postId
      );
      const newLikes = state.posts[indexOf].likes.filter(
        (like) => like.userId !== action.payload.userId
      );
      state.posts[indexOf].likes = newLikes;
      return {
        ...state,
        loading: false,
        error: null,
      };

    case UN_LIKE_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case COMMENT_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case COMMENT_POST_SUCCESS:
      const indexOfComment = state.posts.findIndex(
        (post) => post.id === action.payload.postId
      );
      state.posts[indexOfComment].comment.push(action.payload.newComment);
      return {
        ...state,
        loading: false,
        error: null,
      };

    case COMMENT_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
