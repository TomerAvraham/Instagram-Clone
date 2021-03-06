import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <LinearProgress />
    </div>
  );
};

export default Loader;
