import React from "react";
import s from "./Login.module.scss";
import logo from "./../../assets/img/logo.svg";
import { Field, reduxForm } from "redux-form";
import { Input } from "../common/Form/FormItems";
import { required } from "../common/Form/validators";
import Preloader from "../common/Preloader/Preloader";

const LoginForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        component={Input}
        name={"email"}
        type={"email"}
        placeholder={"Ваш email..."}
        validate={required}
      />
      <Field
        component={Input}
        name={"password"}
        type={"password"}
        placeholder={"Ваш пароль..."}
        validate={required}
      />

      <button className={s.btn_b}>Войти</button>
      {props.error && (
        <div className={s.errorSubmit}>
          <small>{props.error}</small>
        </div>
      )}
    </form>
  );
};

let LoginReduxForm = reduxForm({
  form: "login"
})(LoginForm);

const Login = props => {
  let onSubmit = formData => {
    props.loginMe(formData.email, formData.password);
  };

  return (
    <div className={s.loginWrap}>
      <div className={s.sectionHeader}>
        <img src={logo} alt="logo" />
      </div>
      <LoginReduxForm onSubmit={onSubmit} />
      <div className={s.fetchingStatus}>
        {props.isFetching && <small>Авторизуемся...</small>}
      </div>
    </div>
  );
};

export default Login;
