import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

let mapStateToPropsRedirect = state => {
  return {
    isLogged: state.auth.isLogged
  };
};

export const withAuthRedirect = Component => {
  class RedirectComponent extends React.Component {
    render() {
      if (!this.props.isLogged) return <Redirect push to="/login" />;

      return <Component {...this.props} />;
    }
  }

  let ConnectedAuthRedirectComponent = connect(mapStateToPropsRedirect)(
    RedirectComponent
  );

  return ConnectedAuthRedirectComponent;
};
