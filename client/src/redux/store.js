import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { loginReducer, registerReducer } from "./reducers/userReducers";
import {
  postsReducer,
  likedPostsReducer,
  singlePostReducer,
} from "./reducers/postReducers";
import { addPostReducer } from "./reducers/addPostReducers";
import { profileReducer, allProfileReducer } from "./reducers/profileReducers";

import jwt_decode from "jwt-decode";

const reducer = combineReducers({
  userLogin: loginReducer,
  userRegister: registerReducer,
  userPosts: postsReducer,
  userLikePosts: likedPostsReducer,
  userAddPost: addPostReducer,
  userProfile: profileReducer,
  userSinglePost: singlePostReducer,
  allProfiles: allProfileReducer,
});

const userInfo = localStorage.getItem("accessToken")
  ? jwt_decode(JSON.parse(localStorage.getItem("accessToken")))
  : null;

const initialState = {
  userLogin: {
    loading: false,
    isAuth: userInfo ? true : false,
    error: null,
    userInfo,
  },
  userRegister: {
    loading: false,
    isCreate: false,
    error: null,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
