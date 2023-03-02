import React from "react";
import s from "./preloader.module.scss";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const ColorCircularProgress = withStyles({
  root: {
    color: "#3E47C0"
  }
})(CircularProgress);

const Preloader = ({ medium, small, size }) => {
  const preloaderSize = size || 22;
  return (
    <>
      <div
        className={`${s.preloader} ${medium && s.medium} ${small && s.small}`}
      >
        <ColorCircularProgress size={preloaderSize} thickness={6} />
      </div>
    </>
  );
};

export default Preloader;
