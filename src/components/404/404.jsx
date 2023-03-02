import React from "react";
import { withRouter } from "react-router-dom";
import s from "./notfound.module.scss";

const NotFound404 = props => {
  return (
    <div className={s.emptyWrap}>
      <h1>Page does not exist</h1>
    </div>
  );
};

export default withRouter(NotFound404);
