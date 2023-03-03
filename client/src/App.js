import React, {useEffect} from "react";
import {Route, Switch} from "react-router-dom";
import "./components/scss/App.scss";
import s from "./components/scss/components.module.scss";
import LoginContainer from "./components/Login/LoginContainer";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter, Redirect} from "react-router";
import Preloader from "./components/common/Preloader/Preloader";
import {initializeApp} from "./redux/appReducer";
import NotFound404 from "./components/404/404";
import RoutesContainer from "./components/Routes/RoutesContainer";
import DashboardContainer from "./components/Dashboard/FunctionsContainer";

const App = props => {
    useEffect(() => {
        props.initializeApp();
    }, []);

    if (!props.initialized) {
        return (
            <div className={s.appPreloaderWrap}>
                <Preloader size={42}/>
            </div>
        );
    }
    return (
        <div className={s.app_wrapper}>
            <div className={s.container}>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/functions"/>}/>
                    <Route
                        exact
                        path="/functions"
                        render={() => <DashboardContainer/>}
                    />
                    <Route
                        exact
                        path="/routes"
                        render={() => <RoutesContainer/>}
                    />
                    <Route exact path="/login" render={() => <LoginContainer/>}/>
                    <Route path="*" render={() => <NotFound404/>}/>
                </Switch>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        initialized: state.app.initialized
    };
};

export default compose(
    connect(mapStateToProps, {initializeApp}),
    withRouter,
)(App);


