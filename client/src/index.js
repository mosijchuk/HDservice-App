import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import store from "./redux/redux-store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import moment from "moment/min/moment-with-locales";
import Moment from "react-moment";

Moment.globalMoment = moment;
moment.lang('en-gb');

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
