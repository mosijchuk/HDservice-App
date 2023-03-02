import React, {useEffect, useState} from "react";
import s from "./login.module.scss";
import logo from "./../../assets/img/logo.svg";
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/Form/FormItems";
import {required} from "../common/Form/validators";
import arrow from "./../../assets/img/btnArrow.svg"

const LoginForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                component={Input}
                name={"email"}
                type={"email"}
                placeholder={"Your email..."}
                validate={required}
            />
            <Field
                component={Input}
                name={"password"}
                type={"password"}
                placeholder={"Your password..."}
                validate={required}
            />

            <button className={s.btn_b}>Enter <img src={arrow} alt="arrow"/></button>
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
    const onSubmitLogin = formData => {
        props.loginMe(formData.email, formData.password);
    };

    return (
        <div className={s.loginPage}>
            <div className={s.headerLogoWrap}>
                <a href="/">
                    <img src={logo} alt="logo"/>
                </a>
            </div>

            <div className={s.loginWrap}>
                <div className={s.sectionHeader}>
                    <h1>Log in</h1>
                </div>
                {!props.isLogged && !props.isSigned && <LoginReduxForm onSubmit={onSubmitLogin}/>}
                <div className={s.fetchingStatus}>
                    {props.isFetching && <small>Authorization...</small>}
                    {props.isFetchingStaff && <small>Loading deliverymen...</small>}
                </div>
            </div>
            <svg className={s.spot} width="434" height="504" viewBox="0 0 434 504" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M44.5913 171.171C128.956 109.877 264.925 54.4054 345.349 121.406C425.648 188.301 369.912 339.601 297.713 399.793C222.514 462.487 148.666 539.774 83.2108 483.771C11.9773 422.824 -41.9047 234.013 44.5913 171.171Z"
                    fill="#F5F4F9"/>
                <path
                    d="M253.828 3.26695C212.307 23.3812 209.171 44.4308 230.243 53.775C240.827 58.4683 254.105 54.966 286.369 58.4683C319.974 62.1161 333.303 82.5375 339.327 69.5375C358.328 28.5379 285.188 -11.9255 253.828 3.26695Z"
                    fill="#F5F4F9"/>
                <path
                    d="M432.596 250.012C430.367 240.427 420.803 239.135 415.56 242.449C408.823 246.707 405.121 245.528 397.86 266.679C390.296 288.71 390.973 299.289 400.799 299.06C424.901 298.5 438.037 273.4 432.596 250.012Z"
                    fill="#F5F4F9"/>
            </svg>
        </div>

    )
};

export default Login;
