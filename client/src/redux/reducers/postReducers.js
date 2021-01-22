import {
  GET_POST_FAIL,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_LIKED_POST_FAIL,
  GET_LIKED_POST_SUCCESS,
  GET_LIKED_POST_REQUEST,
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
  DELETE_POST_SUCCESS,
  DELETE_POST_REQUEST,
  SINGLE_POST_FAIL,
  SINGLE_POST_SUCCESS,
  SINGLE_POST_REQUEST,
} from "../types/postTypes";

export const postsReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POST_REQUEST:
      return {
        loading: true,
        posts: [],
        error: null,
      };

    case GET_POST_SUCCESS:
      return {
        loading: false,
        posts: payload,
        error: null,
      };

    case GET_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case LIKE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LIKE_POST_SUCCESS:
      const index = state.posts.findIndex((post) => post.id === payload.postId);
      state.posts[index].likes.push(payload.newLike);
      return {
        ...state,
        loading: false,
        error: null,
      };

    case LIKE_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case UN_LIKE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UN_LIKE_POST_SUCCESS:
      const indexOf = state.posts.findIndex(
        (post) => post.id === payload.postId
      );
      const newLikes = state.posts[indexOf].likes.filter(
        (like) => like.userId !== payload.userId
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
        error: true,
      };

    case COMMENT_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case COMMENT_POST_SUCCESS:
      const indexOfComment = state.posts.findIndex(
        (post) => post.id === payload.postId
      );
      state.posts[indexOfComment].comment.push(payload.newComment);
      return {
        ...state,
        loading: false,
        error: null,
      };

    case COMMENT_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case DELETE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case DELETE_POST_SUCCESS:
      const afterDeletePost = state.posts.filter((post) => post.id !== payload);
      return {
        loading: false,
        error: null,
        posts: afterDeletePost,
      };
    case DELETE_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export const likedPostsReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LIKED_POST_REQUEST:
      return {
        loading: true,
        posts: [],
        error: null,
      };

    case GET_LIKED_POST_SUCCESS:
      return {
        loading: false,
        posts: payload,
        error: null,
      };

    case GET_LIKED_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case `FAVORITE_${LIKE_POST_REQUEST}`:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case `FAVORITE_${LIKE_POST_SUCCESS}`:
      const index = state.posts.findIndex((post) => post.id === payload.postId);
      state.posts[index].likes.push(payload.newLike);
      return {
        ...state,
        loading: false,
        error: null,
      };

    case `FAVORITE_${LIKE_POST_FAIL}`:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case `FAVORITE_${UN_LIKE_POST_REQUEST}`:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case `FAVORITE_${UN_LIKE_POST_SUCCESS}`:
      const indexOf = state.posts.findIndex(
        (post) => post.id === payload.postId
      );
      const newLikes = state.posts[indexOf].likes.filter(
        (like) => like.userId !== payload.userId
      );
      state.posts[indexOf].likes = newLikes;
      return {
        ...state,
        loading: false,
        error: null,
      };

    case `FAVORITE_${UN_LIKE_POST_FAIL}`:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case `FAVORITE_${COMMENT_POST_REQUEST}`:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case `FAVORITE_${COMMENT_POST_SUCCESS}`:
      const indexOfComment = state.posts.findIndex(
        (post) => post.id === payload.postId
      );
      state.posts[indexOfComment].comment.push(payload.newComment);
      return {
        ...state,
        loading: false,
        error: null,
      };

    case `FAVORITE_${COMMENT_POST_FAIL}`:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case `FAVORITE_${DELETE_POST_REQUEST}`:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case `FAVORITE_${DELETE_POST_SUCCESS}`:
      const afterDeletePost = state.posts.filter((post) => post.id !== payload);
      return {
        loading: false,
        error: null,
        posts: afterDeletePost,
      };
    case `FAVORITE_${DELETE_POST_FAIL}`:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export const singlePostReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case SINGLE_POST_REQUEST:
      return { loading: true, error: null };

    case SINGLE_POST_SUCCESS:
      return { loading: false, error: null, post: payload };
    case SINGLE_POST_FAIL:
      return { loading: false, error: true };

    case `SINGLE_${LIKE_POST_REQUEST}`:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case `SINGLE_${LIKE_POST_SUCCESS}`:
      state.post.likes.push(payload.newLike);
      return {
        ...state,
        loading: false,
        error: null,
      };

    case `SINGLE_${LIKE_POST_FAIL}`:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case `SINGLE_${UN_LIKE_POST_REQUEST}`:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case `SINGLE_${UN_LIKE_POST_SUCCESS}`:
      const newLikes = state.post.likes.filter(
        (like) => like.userId !== payload.userId
      );
      state.post.likes = newLikes;
      return {
        ...state,
        loading: false,
        error: null,
      };

    case `SINGLE_${UN_LIKE_POST_FAIL}`:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case `SINGLE_${COMMENT_POST_REQUEST}`:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case `SINGLE_${COMMENT_POST_SUCCESS}`:
      state.post.comment.push(payload.newComment);
      return {
        ...state,
        loading: false,
        error: null,
      };

    case `SINGLE_${COMMENT_POST_FAIL}`:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case `SINGLE_${DELETE_POST_REQUEST}`:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case `SINGLE_${DELETE_POST_SUCCESS}`:
      return {
        loading: false,
        error: null,
        post: null,
      };
    case `SINGLE_${DELETE_POST_FAIL}`:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};
