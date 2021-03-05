import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import Feed from "./views/Feed/Feed";
import Navbar from "./components/Navbar/Navbar";
import Chat from "./views/Chat/Chat";
import Profile from "./views/Profile/Profile";
import LikedPosts from "./views/LikedPosts/LikedPosts";
import AddPost from "./views/AddPost/AddPost";
import SinglePost from "./views/SinglePost/SinglePost";

const App = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { isAuth, userInfo } = userLogin;

  return (
    <div className="app-root">
      {isAuth && <Navbar userInfo={userInfo} />}
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route
          path="/"
          exact
          render={() => (isAuth ? <Feed /> : <Redirect to="/login" />)}
        />
        <Route
          path="/profile/:userId"
          exact
          render={() => (isAuth ? <Profile /> : <Redirect to="/login" />)}
        />
        <Route
          path="/post/:postId"
          exact
          render={() => (isAuth ? <SinglePost /> : <Redirect to="/login" />)}
        />

        <Route
          path="/chat"
          exact
          render={() => (isAuth ? <Chat /> : <Redirect to="/login" />)}
        />
        <Route
          path="/likes"
          exact
          render={() => (isAuth ? <LikedPosts /> : <Redirect to="/login" />)}
        />
        <Route
          path="/addPost"
          exact
          render={() => (isAuth ? <AddPost /> : <Redirect to="/login" />)}
        />
      </Switch>
    </div>
  );
};

export default App;
