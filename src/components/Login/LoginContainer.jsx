import React from "react";
import Login from "./Login";
import s from "./Login.module.scss";
import { connect } from "react-redux";
import { loginMe } from "../../redux/authReducer";
import { Redirect } from "react-router-dom";

const LoginContainer = props => {
  if (props.isLogged) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className={s.loginPage}>
      <Login {...props} />
    </div>
  );
};

let mapStateToProps = state => ({
  isLogged: state.auth.isLogged,
  isFetching: state.auth.isFetching
});

export default connect(mapStateToProps, { loginMe })(LoginContainer);
