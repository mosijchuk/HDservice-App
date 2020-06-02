import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./components/scss/App.scss";
import s from "./components/scss/components.module.scss";
import LoginContainer from "./components/Login/LoginContainer";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router";
import Preloader from "./components/common/Preloader/Preloader";
import { initializeApp } from "./redux/appReducer";
import NotFound404 from "./components/404/404";
import DashboardContainer from "./components/Dashboard/DashboardContainer";

const App = props => {
  useEffect(() => {
    setTimeout(() => {
      props.initializeApp();
    }, 1000);
  }, []);

  if (!props.initialized) {
    return (
      <div className={s.appPreloaderWrap}>
        <Preloader size={52} />
      </div>
    );
  }
  return (
    <div className={s.app_wrapper}>
      <div className={s.container}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
          <Route
            exact
            path="/dashboard"
            render={() => <DashboardContainer />}
          />
          <Route exact path="/login" render={() => <LoginContainer />} />
          <Route path="*" render={() => <NotFound404 />} />
        </Switch>
      </div>
    </div>
  );
};

let mapStateToProps = state => {
  return {
    initialized: state.app.initialized
  };
};

export default compose(
  connect(mapStateToProps, { initializeApp }),
  withRouter
)(App);

// Елена Паминская 525736
// Алексей Пряхин 532295
