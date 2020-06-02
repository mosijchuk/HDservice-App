import moment from "moment/min/moment-with-locales";
import { ObivkaAPI, YandexAPI } from "../API/api";

const SET_ADDRESS = "@schedule/SET_ADDRESS";
const SET_SEARCH_RESULTS = "@schedule/SET_SEARCH_RESULTS";
const CLEAR_ADDRESS = "@schedule/CLEAR_ADDRESS";
const SELECT_USER = "@schedule/SELECT_USER";
const SET_USER_MEETINGS = "@schedule/SET_USER_MEETINGS";
const SET_CALENDAR_DATA = "@schedule/SET_CALENDAR_DATA";
const SET_FREE_SCHEDULE = "@schedule/SET_FREE_SCHEDULE";
const TOGGLE_FETCHING_ADDRESS = "@schedule/TOGGLE_FETCHING_ADDRESS";
const TOGGLE_FETCHING_MEETINGS = "@schedule/TOGGLE_FETCHING_MEETINGS";
const TOGGLE_FETCHING_SCHEDULE = "@schedule/TOGGLE_FETCHING_SCHEDULE";

let initialState = {
  searchResults: [],
  selectedUser: {},
  selectedAddress: {},
  userMeetings: [],
  calendar: {
    period: null,
    meetings: []
  },
  freeSchedule: [],
  isFetchingAddress: false,
  isFetchingMeetings: false,
  isFetchingSchedule: false
};

const scheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADDRESS:
    case SELECT_USER:
    case SET_SEARCH_RESULTS:
    case CLEAR_ADDRESS:
    case SET_CALENDAR_DATA:
    case SET_USER_MEETINGS:
    case SET_FREE_SCHEDULE:
    case TOGGLE_FETCHING_ADDRESS:
    case TOGGLE_FETCHING_MEETINGS:
    case TOGGLE_FETCHING_SCHEDULE:
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
let setAddress = selectedAddress => ({
  type: SET_ADDRESS,
  payload: { selectedAddress }
});

let clearAddressData = () => ({
  type: CLEAR_ADDRESS,
  payload: { selectedAddress: {} }
});

let setUser = selectedUser => ({
  type: SELECT_USER,
  payload: { selectedUser }
});

let setSearchResults = searchResults => ({
  type: SET_SEARCH_RESULTS,
  payload: { searchResults }
});

let setCalendarData = calendar => ({
  type: SET_CALENDAR_DATA,
  payload: { calendar }
});

let setUserMeetings = userMeetings => ({
  type: SET_USER_MEETINGS,
  payload: { userMeetings }
});

let setFreeSchedule = freeSchedule => ({
  type: SET_FREE_SCHEDULE,
  payload: { freeSchedule }
});

let toggleIsFetchingAddress = isFetchingAddress => ({
  type: TOGGLE_FETCHING_ADDRESS,
  payload: { isFetchingAddress }
});

let toggleIsFetchingMeetings = isFetchingMeetings => ({
  type: TOGGLE_FETCHING_MEETINGS,
  payload: { isFetchingMeetings }
});

let toggleIsFetchingSchedule = isFetchingSchedule => ({
  type: TOGGLE_FETCHING_SCHEDULE,
  payload: { isFetchingSchedule }
});

//functions
const filterMeetings = (meetings, selectedPeriod) => {
  return meetings.filter(meeting =>
    selectedPeriod.some(date => date === meeting.date)
  );
};

const getCalendarByPeriod = (period, holidays) => {
  const calendar = [];
  for (let i = 1; i < period + 1; i++) {
    const stringDate = moment()
      .add(i, "day")
      .format("L");
    const stringDay = moment()
      .add(i, "day")
      .format("dddd");
    const day = {
      date: stringDate,
      day: stringDay,
      holiday: holidays.some(holiday => holiday === stringDay),
      meetings: [
        {
          time: "с 11 до 12",
          booked: false,
          address: null
        },
        {
          time: "с 14 до 15",
          booked: false,
          address: null
        },
        {
          time: "с 17 до 18",
          booked: false,
          address: null
        },
        {
          time: "с 18 до 19",
          booked: false,
          address: null
        }
      ]
    };
    calendar.push(day);
  }
  return calendar;
};

//thunks
export const getUserMeetings = () => (dispatch, getState) => {
  let userId = getState().schedule.selectedUser.id;
  const calendarPeriod = getState().schedule.calendar.period;
  dispatch(toggleIsFetchingMeetings(true));
  ObivkaAPI.getMeetings(userId).then(response => {
    dispatch(setUserMeetings(response.data.meetings));
    dispatch(getSchedule(calendarPeriod || 7));
    dispatch(toggleIsFetchingMeetings(false));
  });
};

export const selectAddress = addressData => (dispatch, getState) => {
  const baseAddress = getState().schedule.selectedUser.baseAddress;
  const addressString = addressData.address + ", " + addressData.description;
  dispatch(toggleIsFetchingAddress(true));
  dispatch(toggleIsFetchingSchedule(true));
  ObivkaAPI.getAddressParams(baseAddress, addressString).then(response => {
    if (response.data.resultCode === 1 || response.data.resultCode === 2) {
      let newAddressData = {
        ...addressData,
        addressString: addressString,
        errorMessage: response.data.errorMessage,
        allowedRadius: response.data.allowedRadius,
        allowedRadiusVal: response.data.allowedRadiusVal,
        distanceText: response.data.distanceText,
        distanceValue: response.data.distanceValue,
        durationText: response.data.durationText,
        durationValue: response.data.durationValue
      };
      dispatch(setAddress(newAddressData));
      dispatch(toggleIsFetchingAddress(false));
      dispatch(getFreeSchedule());
    } else if (response.data.resultCode === 0) {
      let errorData = {
        errorMessage: response.data.errorMessage
      };
      dispatch(setAddress(errorData));
      dispatch(toggleIsFetchingAddress(false));
      dispatch(toggleIsFetchingSchedule(false));
    }
  });
  dispatch(setSearchResults([]));
};

export const recalculateAddress = () => (dispatch, getState) => {
  const addressData = getState().schedule.selectedAddress;
  addressData.address && dispatch(selectAddress(addressData));
};

export const clearAddress = () => dispatch => {
  dispatch(clearAddressData());
  dispatch(setFreeSchedule([]));
  dispatch(setSearchResults([]));
  dispatch(toggleIsFetchingAddress(false));
  dispatch(toggleIsFetchingSchedule(false));
};

export const selectUser = userId => (dispatch, getState) => {
  const users = getState().dashboard.users;
  const selectedUserData = users.filter(user => user.id === userId);
  dispatch(setUser(selectedUserData[0]));
  dispatch(recalculateAddress());
  dispatch(getUserMeetings());
};

export const findAddress = address => dispatch => {
  if (address.length > 3) {
    YandexAPI.findAddress(address).then(data => {
      if (data.response) {
        let searchData = data.response.GeoObjectCollection.featureMember;
        let searchArray = searchData.map(result => ({
          address: result.GeoObject.name,
          description: result.GeoObject.description,
          position: result.GeoObject.Point.pos
        }));
        dispatch(setSearchResults(searchArray));
      }
    });
  } else {
    dispatch(setSearchResults([]));
  }
};

export const getFreeSchedule = () => (dispatch, getState) => {
  dispatch(toggleIsFetchingSchedule(true));
  const calendarMeetings = getState().schedule.calendar.meetings;
  const selectedAddress = getState().schedule.selectedAddress;
  const withoutHolidays = calendarMeetings.filter(
    calendarDay => !calendarDay.holiday
  );

  let withoutParams = [];
  withoutHolidays.forEach(day => {
    day.meetings.forEach(time => {
      !time.booked &&
        withoutParams.push({
          date: day.date,
          day: day.day,
          booked: time.booked,
          ...time
        });
    });
  });

  let calculatedSchedule = [];

  const getAddrParams = time => {
    if (time.posibleOrigin) {
      ObivkaAPI.getAddressParams(
        time.posibleOrigin,
        selectedAddress.addressString
      ).then(res => {
        calculatedSchedule.push({
          ...time,
          params: {
            distanceText: res.data.distanceText,
            distanceValue: res.data.distanceValue,
            durationText: res.data.durationText,
            durationValue: res.data.durationValue
          }
        });
        dispatch(setFreeSchedule(calculatedSchedule));
        dispatch(sortFreeSchedule());
      });
    } else {
      calculatedSchedule.push({
        ...time,
        params: {
          distanceText: selectedAddress.distanceText,
          distanceValue: selectedAddress.distanceValue,
          durationText: selectedAddress.durationText,
          durationValue: selectedAddress.durationValue
        }
      });
      dispatch(setFreeSchedule(calculatedSchedule));
      dispatch(sortFreeSchedule());
    }
  };
  withoutParams.map(time => {
    getAddrParams(time);
  });
  // Promise.all([addressRoutesCalc]).then(() => {
  //   dispatch(setFreeSchedule(calculatedSchedule));
  //   dispatch(sortFreeSchedule());
  // });
};

export const sortFreeSchedule = () => (dispatch, getState) => {
  const calendarMeetings = getState().schedule.calendar.meetings;
  const allowedRadius = getState().schedule.selectedAddress.allowedRadiusVal;
  const freeSchedule = getState().schedule.freeSchedule;

  const filteredSchedule = freeSchedule.filter(item => {
    return item.params.distanceValue < allowedRadius * 3;
  });
  // .sort(function(a, b) {
  //   if (new Date(a.date) < new Date(b.date)) return -1;
  //   if (new Date(a.date) > new Date(b.date)) return 1;
  //   // при равных date сортируем по time
  //   if (+/\d+/.exec(a.time) < +/\d+/.exec(b.time)) return -1;
  //   if (+/\d+/.exec(a.time) > +/\d+/.exec(b.time)) return 1;
  //   return 0;
  // });

  const sortedSchedule = [];
  calendarMeetings.forEach(day => {
    day.meetings.forEach(time => {
      const finded = filteredSchedule.find(filtered => {
        return filtered.date === day.date && filtered.time === time.time;
      });
      return finded && sortedSchedule.push(finded);
    });
  });

  dispatch(setFreeSchedule(sortedSchedule));
  dispatch(toggleIsFetchingSchedule(false));
};

export const getSchedule = period => (dispatch, getState) => {
  const userMeetings = getState().schedule.userMeetings;
  const userHolidays = getState().schedule.selectedUser.holidays;
  const fullPeriodDays = getCalendarByPeriod(period, userHolidays);

  let prevAddress = null;
  const getPrevOrigin = meeting => {
    if (meeting.address) {
      prevAddress = meeting.address;
      return null;
    } else if (!meeting.address && prevAddress) {
      let origin = prevAddress;
      prevAddress = null;
      return origin;
    } else {
      return null;
    }
  };

  const withBookedDays = fullPeriodDays.map(day => {
    return {
      ...day,
      meetings: day.meetings.map(time => {
        const meeting =
          userMeetings.find(meeting => {
            return meeting.date === day.date && meeting.time === time.time;
          }) || false;
        return {
          ...time,
          booked: meeting && true,
          address: meeting.address || null,
          posibleOrigin: getPrevOrigin(meeting)
        };
      })
    };
  });

  const calendarData = {
    period,
    meetings: withBookedDays
  };
  dispatch(setCalendarData(calendarData));
  dispatch(recalculateAddress());
};

export default scheduleReducer;
