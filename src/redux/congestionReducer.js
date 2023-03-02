import moment from "moment/min/moment-with-locales";
import { HDserviceAPI } from "../API/api";

const SET_PERIOD = "@congestion/SET_PERIOD";
const SET_MEETINGS = "@congestion/SET_MEETINGS";
const TOGGLE_FETCHING_CONGESTION = "@congestion/TOGGLE_FETCHING_CONGESTION";

const initialState = {
  selectedPeriod: [],
  meetingsUsers: [],
  isFetchingCongestion: false
};

const congestionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PERIOD:
    case SET_MEETINGS:
    case TOGGLE_FETCHING_CONGESTION:
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
const toggleIsFetchingCongestion = isFetchingCongestion => ({
  type: TOGGLE_FETCHING_CONGESTION,
  payload: { isFetchingCongestion }
});

const setPeriodData = selectedPeriod => ({
  type: SET_PERIOD,
  payload: { selectedPeriod }
});


const setMeetings = meetingsUsers => ({
  type: SET_MEETINGS,
  payload: { meetingsUsers }
});

//functions
const getPeriodDays = period => {
  let numberOfDays;
  let periodArr = [];
  if (period == "currentWeek") {
    numberOfDays = moment()
      .endOf("week")
      .diff(moment(), "days");
  } else if (period == "currentMonth") {
    numberOfDays = moment()
      .endOf("month")
      .diff(moment(), "days");
  } else if (period == "nextMonth") {
    numberOfDays = moment()
      .add(1, "month")
      .endOf("month")
      .diff(moment(), "days");
  }

  if (period == "nextMonth") {
    for (let i = 1; i < numberOfDays; i++) {
      periodArr.push(
        moment()
          .endOf("month")
          .add(i, "day")
          .format("L")
      );
    }
  } else {
    for (let i = 0; i < numberOfDays + 1; i++) {
      periodArr.push(
        moment()
          .add(i, "day")
          .format("L")
      );
    }
  }
  return periodArr;
};

const filterMeetings = (meetings, selectedPeriod) => {
  if(meetings) {
    return meetings.filter(meeting =>
        selectedPeriod.some(date => date === meeting.date)
    );
  }else{
    return [];
  }
};

//thunks
export const setPeriod = period => dispatch => {
  const selectedPeriod = getPeriodDays(period);
  dispatch(setPeriodData(selectedPeriod));
};

export const updateChart = () => (dispatch, getState) => {
  dispatch(toggleIsFetchingCongestion(true));
  const department = getState().dashboard.selectedDepartment
  const users = getState().dashboard.users.filter(user=>user.department==department)
  const selectedPeriod = getState().congestion.selectedPeriod
  let iterations = 0;
  let meetings = [];
  users.map(user => {
    HDserviceAPI.getMeetings(user.id, department).then(response => {
      let meetingsUser = {
        userId: response.data.userId,
        userName: response.data.userName,
        meetings: filterMeetings(response.data.meetings, selectedPeriod)
      };
      meetings.push(meetingsUser);

      ++iterations;

      if (iterations === users.length) {
        let sortedMeetings = meetings.sort(function(a, b) {
          let nameA = a.userName.toLowerCase(),
            nameB = b.userName.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        dispatch(setMeetings(sortedMeetings));
        dispatch(toggleIsFetchingCongestion(false));
      }
    });
  });
};

export default congestionReducer;
