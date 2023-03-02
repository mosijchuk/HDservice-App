import {AuthAPI} from "./../API/api";
import {stopSubmit} from "redux-form";
import {getStaffData} from "./dashboardReducer";

const SET_LOGIN_DATA = "@auth/SET_LOGIN_DATA";
const TOGGLE_FETCHING_LOGIN = "@auth/TOGGLE_FETCHING_LOGIN";
const TOGGLE_FETCHING_SIGNING = "@auth/TOGGLE_FETCHING_SIGNING";

let initialState = {
    token: null,
    isLogged: false,
    isFetching: false,
    isFetchingSignUsers: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN_DATA:
        case TOGGLE_FETCHING_LOGIN:
        case TOGGLE_FETCHING_SIGNING:
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
    payload: {token, isLogged}
});


export let toggleIsFetchingLogin = isFetching => ({
    type: TOGGLE_FETCHING_LOGIN,
    payload: {isFetching}
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

export function getCookie(name) {
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


export const authMe = () => (dispatch, getState) => {
    const token = getCookie("token")
    const staffLength = getState().dashboard.users.length

        return new Promise(resolve => {
            if(token) {
                AuthAPI.authMe(token).then(data => {
                    if (data.resultCode === 1) {
                        dispatch(setAuthUserData(token, true));
                        dispatch(getStaffData(resolve))
                    } else {
                        dispatch(setAuthUserData(null, false));
                    }
                });
            }else{
                resolve(1)
            }

        })

    return new Promise(resolve => {
        dispatch(setAuthUserData(null, false));
        resolve(1)
    })

};

export const loginMe = (email, password) => dispatch => {
    dispatch(toggleIsFetchingLogin(true));
    email && password && AuthAPI.login(email, password).then(data => {
        if (data.resultCode === 1) {
            setCookie("token", data.token);
            dispatch(authMe());
        } else {
            dispatch(stopSubmit("login", {_error: data.errorMessage}));
        }
        dispatch(toggleIsFetchingLogin(false));
    });
};

export const logoutMe = () => dispatch => {
    setCookie("token", '');
    dispatch(setAuthUserData(null, false));
};

export default authReducer;
