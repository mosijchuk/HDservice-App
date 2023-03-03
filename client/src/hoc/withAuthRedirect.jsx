import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsRedirect = state => {
  return {
    isLogged: state.auth.isLogged
  };
};

export const withAuthRedirect = Component => {
  const RedirectComponent = (props) => {
    if (!props.isLogged) return <Redirect push to="/login"/>;

    return <Component {...props} />;
  }

  const ConnectedAuthRedirectComponent = connect(mapStateToPropsRedirect)(
    RedirectComponent
  );

  return ConnectedAuthRedirectComponent;
};
