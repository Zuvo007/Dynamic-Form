import React from "react";
import classes from "./Loader.module.css";

const Loader = ({ isFullScreen = false, style = {} }) => {
  return (
    <div
      className={`${classes.loaderContainer} ${
        isFullScreen ? classes.backdrop : ""
      }`}
    >
      <div className={classes.loader} style={style}></div>
    </div>
  );
};

export default Loader;
