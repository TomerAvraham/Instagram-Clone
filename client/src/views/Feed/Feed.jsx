import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Link } from "react-router-dom";

const Feed = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { isAuth } = userLogin;

  return isAuth ? (
    <div>
      <h1>Feed</h1>
    </div>
  ) : (
    <h1>not auth</h1>
  );
};

export default Feed;
