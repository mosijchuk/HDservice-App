import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import dashboardReducer from "./dashboardReducer";
import authReducer from "./authReducer";
import thunkMiddleWare from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import appReducer from "./appReducer";
import scheduleReducer from "./scheduleReducer";

let reducers = combineReducers({
  dashboard: dashboardReducer,
  schedule: scheduleReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleWare))
);
// let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

window.store = store;
export default store;
