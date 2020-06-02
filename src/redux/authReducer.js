import { AuthAPI } from "./../API/api";
import { stopSubmit } from "redux-form";

const SET_LOGIN_DATA = "@auth/SET_LOGIN_DATA";
const SET_CAPTCHA_URL = "@auth/SET_CAPTCHA_URL";
const TOGGLE_FETCHING_LOGIN = "@auth/TOGGLE_FETCHING_LOGIN";

let initialState = {
  token: null,
  isLogged: false,
  isFetching: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_DATA:
    case SET_CAPTCHA_URL:
    case TOGGLE_FETCHING_LOGIN:
      return {
        ...state,
        ...action.payload
      };
    default: {
      return state;
    }
  }
};

export let setAuthUserData = (token, isLogged) => ({
  type: SET_LOGIN_DATA,
  payload: { token, isLogged }
});

export let toggleIsFetchingLogin = isFetching => ({
  type: TOGGLE_FETCHING_LOGIN,
  payload: { isFetching }
});

export let setCaptchaUrl = captchaUrl => ({
  type: SET_CAPTCHA_URL,
  payload: { captchaUrl }
});

//func
function setCookie(name, value, expires, path, domain, secure) {
  document.cookie =
    name +
    "=" +
    escape(value) +
    (expires ? "; expires=" + expires : "") +
    (path ? "; path=" + path : "") +
    (domain ? "; domain=" + domain : "") +
    (secure ? "; secure" : "");
}

function getCookie(name) {
  var cookie = " " + document.cookie;
  var search = " " + name + "=";
  var setStr = null;
  var offset = 0;
  var end = 0;
  if (cookie.length > 0) {
    offset = cookie.indexOf(search);
    if (offset != -1) {
      offset += search.length;
      end = cookie.indexOf(";", offset);
      if (end == -1) {
        end = cookie.length;
      }
      setStr = unescape(cookie.substring(offset, end));
    }
  }
  return setStr;
}

//thunks
export const authMe = () => dispatch => {
  let token = getCookie("token");
  return AuthAPI.authMe(token).then(data => {
    if (data.resultCode === 1) {
      dispatch(setAuthUserData(token, true));
    } else {
      dispatch(setAuthUserData(null, false));
    }
  });
};

export const loginMe = (email, password) => dispatch => {
  dispatch(toggleIsFetchingLogin(true));
  AuthAPI.login(email, password).then(data => {
    if (data.resultCode === 1) {
      setCookie("token", data.token);
      dispatch(authMe());
    } else {
      dispatch(stopSubmit("login", { _error: data.errorMessage }));
    }
    dispatch(toggleIsFetchingLogin(false));
  });
};

export const logoutMe = () => dispatch => {
  setCookie("token", null);
  dispatch(setAuthUserData(null, false));
};

export default authReducer;
