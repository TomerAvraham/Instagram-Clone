import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Main from "./pages/main/Main";

const App = () => {
  return (
    <div className="app-root">
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Main} />
      </Switch>
    </div>
  );
};

export default App;
