import {HDserviceAPI} from "../API/api";

const SET_USERS = "@dashboard/SET_USERS"
const IS_FETCHING_STAFF = "@dashboard/IS_FETCHING_STAFF"

const initialState = {
  users: [],
  isFetchingStaff: false
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
    case IS_FETCHING_STAFF:
      return {
        ...state,
        ...action.payload
      };
    default: {
      return state;
    }
  }
};

//actions
const setUsers = users => ({
  type: SET_USERS,
  payload: { users }
});

const toggleIsFetchingStaff = isFetchingStaff => ({
  type: IS_FETCHING_STAFF,
  payload: { isFetchingStaff }
});

//thunks
export const getStaffData = (resolve) => dispatch => {
  dispatch(toggleIsFetchingStaff(true))
  setTimeout(()=>{
  HDserviceAPI.getStaff().then(data => {
    if(data.resultCode===1) {
      resolve(data)
      dispatch(setUsers(data.staff))
    }
    dispatch(toggleIsFetchingStaff(false))
  })
  }, 1000)
}

export default dashboardReducer;
