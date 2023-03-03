import React from "react";
import Login from "./Login";
import { connect } from "react-redux";
import {loginMe} from "../../redux/authReducer";
import { Redirect } from "react-router-dom";

const LoginContainer = props => {
  if (props.isLogged && props.usersLength && !props.isFetchingStaff) {
    return <Redirect to="/functions" />;
  }
  return <Login {...props} />;
};

let mapStateToProps = state => ({
  isLogged: state.auth.isLogged,
  isFetching: state.auth.isFetching,
  isFetchingStaff: state.dashboard.isFetchingStaff,
  usersLength: state.dashboard.users.length,
});

export default connect(mapStateToProps, { loginMe })(LoginContainer);
