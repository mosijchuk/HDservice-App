import moment from "moment/min/moment-with-locales";
import {HDserviceAPI} from "../API/api";

const SET_ADDRESS = "@schedule/SET_ADDRESS";
const SET_SEARCH_RESULTS = "@schedule/SET_SEARCH_RESULTS";
const CLEAR_ADDRESS = "@schedule/CLEAR_ADDRESS";
const SET_INITIAL_STATE = "@schedule/SET_INITIAL_STATE";
const SELECT_USER = "@schedule/SELECT_USER";
const SELECT_DATE = "@schedule/SELECT_DATE";
const SET_USER_MEETINGS = "@schedule/SET_USER_MEETINGS";
const SET_CALENDAR_DATA = "@schedule/SET_CALENDAR_DATA";
const SET_RESERVED_DATES = "@schedule/SET_RESERVED_DATES";
const SET_FREE_SCHEDULE = "@schedule/SET_FREE_SCHEDULE";
const SET_PREV_ACTION = "@schedule/SET_PREV_ACTION";
const TOGGLE_FETCHING_ADDRESS = "@schedule/TOGGLE_FETCHING_ADDRESS";
const TOGGLE_FETCHING_MEETINGS = "@schedule/TOGGLE_FETCHING_MEETINGS";
const TOGGLE_FETCHING_SCHEDULE = "@schedule/TOGGLE_FETCHING_SCHEDULE";
const TOGGLE_FETCHING_ROUTES = "@schedule/TOGGLE_FETCHING_ROUTES";
const TOGGLE_INIT_ROUTES = "@schedule/TOGGLE_INIT_ROUTES";
const TOGGLE_FETCHING_RESERVING = "@schedule/TOGGLE_FETCHING_RESERVING";
const TOGGLE_ONLY_BASE_ROUTE = "@schedule/TOGGLE_ONLY_BASE_ROUTE";
const SET_SHEDULE_PERIOD_DATA = "@schedule/SET_SHEDULE_PERIOD_DATA";


let initialState = {
   searchResults: [],
   selectedUser: {},
   selectedDate: {},
   selectedAddress: {},
   userMeetings: [],
   freeSchedule: {
      period: 7,
      usersSchedule: []
   },
   reservedDates: [],
   prevAction: false,
   isFetchingAddress: false,
   isFetchingMeetings: false,
   isFetchingSchedule: false,
   isFetchingRoutes: false,
   isFetchingReserving: false,
   isFetchingCalendar: false,
   isOnlyBaseRoute: false,
   isRoutesInit: false
};

const scheduleReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_ADDRESS:
      case SELECT_USER:
      case SELECT_DATE:
      case SET_SEARCH_RESULTS:
      case CLEAR_ADDRESS:
      case SET_CALENDAR_DATA:
      case SET_USER_MEETINGS:
      case SET_FREE_SCHEDULE:
      case SET_RESERVED_DATES:
      case SET_PREV_ACTION:
      case TOGGLE_FETCHING_ADDRESS:
      case TOGGLE_FETCHING_MEETINGS:
      case TOGGLE_FETCHING_SCHEDULE:
      case TOGGLE_FETCHING_RESERVING:
      case TOGGLE_FETCHING_ROUTES:
      case TOGGLE_ONLY_BASE_ROUTE:
      case SET_SHEDULE_PERIOD_DATA:
      case TOGGLE_INIT_ROUTES:
         return {
            ...state,
            ...action.payload
         };

      case SET_INITIAL_STATE:
         return {
            ...action.payload
         };
      default: {
         return state;
      }
   }
};

//actions
const setAddress = selectedAddress => ({
   type: SET_ADDRESS,
   payload: {selectedAddress}
});

const setInitialState = initialState => ({
   type: SET_INITIAL_STATE,
   payload: {...initialState}
});

const setUser = selectedUser => ({
   type: SELECT_USER,
   payload: {selectedUser}
});

const setDate = selectedDate => ({
   type: SELECT_DATE,
   payload: {selectedDate}
});

const setReservedDates = reservedDates => ({
   type: SET_RESERVED_DATES,
   payload: {reservedDates}
});

const setSearchResults = searchResults => ({
   type: SET_SEARCH_RESULTS,
   payload: {searchResults}
});

const setCalendarPeriodData = freeSchedule => ({
   type: SET_SHEDULE_PERIOD_DATA,
   payload: {freeSchedule}
});

const toggleIsFetchingSchedule = isFetchingSchedule => ({
   type: TOGGLE_FETCHING_SCHEDULE,
   payload: {isFetchingSchedule}
});

const toggleIsFetchingRoutes = isFetchingRoutes => ({
   type: TOGGLE_FETCHING_ROUTES,
   payload: {isFetchingRoutes}
});

const setUserMeetings = userMeetings => ({
   type: SET_USER_MEETINGS,
   payload: {userMeetings}
});

const toggleIsFetchingAddress = isFetchingAddress => ({
   type: TOGGLE_FETCHING_ADDRESS,
   payload: {isFetchingAddress}
});

const toggleIsFetchingMeetings = isFetchingMeetings => ({
   type: TOGGLE_FETCHING_MEETINGS,
   payload: {isFetchingMeetings}
});

const toggleIsFetchingReserving = isFetchingReserving => ({
   type: TOGGLE_FETCHING_RESERVING,
   payload: {isFetchingReserving}
});

const toggleIsOnlyBaseRoute = isOnlyBaseRoute => ({
   type: TOGGLE_ONLY_BASE_ROUTE,
   payload: {isOnlyBaseRoute}
});

const toggleIsRoutesInit = isRoutesInit => ({
   type: TOGGLE_INIT_ROUTES,
   payload: {isRoutesInit}
});

//functions
const getClosestTrip = (roadmap) => {
   if (roadmap.length) {
      const onlyParams = roadmap.filter(roadItem => roadItem.type === 'params')

      const closest = onlyParams.reduce((acc, loc) => {
            if (acc.totalDistance < loc.totalDistance) {
               return acc
            } else {
               return loc
            }
         }
      )
      return closest
   }
}

const getClosestDay = (days) => {
   if (days.length) {

      const filteredDays = days.filter(day => day.closestDistance)
      if (filteredDays.length) {
         const closest = filteredDays.reduce((acc, loc) => {
               if (acc.closestDistance < loc.closestDistance) {
                  return acc
               } else {
                  return loc
               }
            }
         )
         return closest
      }
   }
}


const getClosestUser = (schedule) => {
   if (schedule.length) {
      const filteredUsers = schedule.filter(user => user.closestDistance)
      const closest = filteredUsers.reduce((acc, loc) => {
            if (acc.closestDistance < loc.closestDistance) {
               return acc
            } else {
               return loc
            }
         }
      )
      return closest
   }
}


//thunks
export const setIsOnlyBase = (isOnlyBase) => (dispatch) => {
   dispatch(toggleIsOnlyBaseRoute(isOnlyBase));
};

export const selectDate = date => (dispatch, getState) => {
   const selectedDateData = {
      date
   }
   dispatch(setDate(selectedDateData))
}


export const selectUser = userId => (dispatch, getState) => {
   const users = getState().dashboard.users
   const selectedUserId = userId || users[0].id
   const selectedUserData = users.find(user => user.id === selectedUserId)
   const selectedScheduleUser = getState().schedule.freeSchedule.usersSchedule.find(scheduleUser => scheduleUser.userId === selectedUserId) || {}

   //set new user
   dispatch(setUser(selectedUserData));

   //set new user closest date
   if (selectedScheduleUser && selectedScheduleUser.userPeriod) {
      const closestUserDate = selectedScheduleUser.userPeriod.find(date => date.closest)
      closestUserDate && dispatch(selectDate(closestUserDate.date));
   }

};

export const injectReservedDate = (reserve) => (dispatch, getState) => {
   const usersSchedule = getState().schedule.freeSchedule.usersSchedule

   if (usersSchedule && reserve) {
      const schWithInject = usersSchedule.map(user => {
         if (reserve.employee == user.userId) {
            return {
               ...user,
               userPeriod: user.userPeriod.map(date => {
                  if (reserve.date === date.date) {
                     return {
                        ...date,
                        roadmap: date.roadmap.map(roadItem => {
                           if (roadItem.type === 'time') {
                              return {
                                 ...roadItem,
                                 intervals: roadItem.intervals.map(time => {
                                    if (reserve.time === time.time) {
                                       return {
                                          ...time,
                                          isReserved: true
                                       }
                                    }
                                    return time
                                 })
                              }
                           }
                           return roadItem
                        })
                     }
                  }
                  return date
               })
            }
         }
         return user
      })

      //dispatch to state injected reserve time
      const injectedReserveSchedule = {
         period: getState().schedule.freeSchedule.period,
         usersSchedule: schWithInject
      }
      dispatch(setCalendarPeriodData(injectedReserveSchedule))
   }
}

export const getReservedDates = () => (dispatch) => {
   HDserviceAPI.getReserves().then(res => {
      dispatch(setReservedDates(res.data))
   })
}

export const createTimeReserve = (time) => (dispatch, getState) => {
   dispatch(toggleIsFetchingReserving(true));
   const employee = getState().schedule.selectedUser.id;
   const date = getState().schedule.selectedDate.date;


   return HDserviceAPI.createReserve(employee, date, time).then(res => {
      dispatch(toggleIsFetchingReserving(false));
      dispatch(getReservedDates());
      if (res.data.resultCode == 1) {
         const injectData = {
            employee,
            date,
            time
         }
         dispatch(injectReservedDate(injectData))

      }
      return res.data
   })
};

export const recalculateAddress = () => (dispatch, getState) => {
   const addressData = getState().schedule.selectedAddress;
   // dispatch(getUserMeetings());
   addressData.address && dispatch(selectAddress(addressData));
};


//clear state
export const selectDefaultScheduleState = () => (dispatch) => {
   dispatch(setInitialState(initialState))
}

export const findAddress = address => dispatch => {
   if (address.length > 3) {
      HDserviceAPI.findAddress(address).then(data => {
         if (data) {
            let searchArray = data.results.map(result => ({
               address: result.address,
               description: result.description,
               position: result.position
            }));
            dispatch(setSearchResults(searchArray));
         }
      });
   } else {
      dispatch(setSearchResults([]));
   }
};

export const selectAddress = addressData => (dispatch, getState) => {
   const addressString = addressData.address + ", " + addressData.description;

   const allUsers = getState().dashboard.users.map(user => user)
   const department = getState().dashboard.selectedDepartment
   const departmentUsers = allUsers.filter(user => user.department == department)

   dispatch(toggleIsFetchingAddress(true));

   const getUserBaseAddrParams = (baseAddress) => {
      return new Promise(resolve => {
         return HDserviceAPI.getAddressParams(baseAddress, addressString).then(response => {
            if (response.data.resultCode === 1 || response.data.resultCode === 2) {
               resolve(response)
            } else if (response.data.resultCode === 0) {
               let errorData = {
                  errorMessage: response.data.errorMessage
               };
               resolve(errorData)
            }
         });
      })
   }

   const usersBaseParams = departmentUsers.map(eachUser => {
      return new Promise(resolve => {
         getUserBaseAddrParams(eachUser.baseAddress).then(res => {
            resolve({
               userId: eachUser.id,
               params: res.data
            })
         })
      })
   })
   Promise.all(usersBaseParams).then((resAddrParams) => {
      const selectedAddressData = {
         ...addressData,
         addressString: addressString,
         errorMessage: resAddrParams[0].params.errorMessage,
         allowedRadius: resAddrParams[0].params.allowedRadius,
         allowedRadiusVal: resAddrParams[0].params.allowedRadiusVal,
         usersParams: resAddrParams
      }
      dispatch(setAddress(selectedAddressData));
      dispatch(toggleIsFetchingAddress(false));
      // Start main core
      dispatch(loadScheduleCore());
   });

   dispatch(setSearchResults([]));
};

export const clearAddress = () => dispatch => {
   dispatch(selectDefaultScheduleState());
};

//START CORE
export const loadScheduleCore = () => (dispatch) => {
   dispatch(getUserMeetings())
   dispatch(getReservedDates());
}

//1
export const getUserMeetings = () => (dispatch, getState) => {
   const allUsers = getState().dashboard.users.map(user => user)
   const department = getState().dashboard.selectedDepartment
   const departmentUsers = allUsers.filter(user => user.department == department)
   const calendarPeriod = getState().schedule.freeSchedule.period;
   dispatch(toggleIsFetchingMeetings(true));


   const meetingsResponses = departmentUsers.map(user => {
      return new Promise(resolve => {
         return HDserviceAPI.getMeetings(user.id, department).then(response => {
            return resolve({userId: user.id, meetings: response.data.meetings || []})
         });
      })
   })

   Promise.all(meetingsResponses).then((allResponses) => {
      dispatch(setUserMeetings(allResponses));
      // dispatch(getSchedule(calendarPeriod || 7));
      dispatch(toggleIsFetchingMeetings(false));
      dispatch(getAllUsersSchedule(calendarPeriod || 7));
   });
};

//2
const getAllUsersSchedule = (period = 7) => (dispatch, getState) => {
   const allUsers = getState().dashboard.users
   const usersMeetings = getState().schedule.userMeetings ? getState().schedule.userMeetings : []
   const periodArr = []
   const allUsersIds = allUsers.map(user => user.id)
   const isFetchingSchedule = getState().schedule.isFetchingSchedule

   //for period
   for (let i = 0; i < period; i++) {
      const isoDate = moment()
         .add(i, "day")
         .format("YYYY-MM-DD");
      const stringDay = moment()
         .add(i, "day")
         .format("dddd");

      periodArr.push(isoDate)
   }

   //get schedule from server
   if (!isFetchingSchedule) {
      dispatch(toggleIsFetchingSchedule(true))
      HDserviceAPI.getDateSchedule(allUsersIds, periodArr).then(res => {
         dispatch(toggleIsFetchingSchedule(false))
         if (res.resultCode === 1) {
            //compose recieved data
            const formattedSchedule = res.periodSchedule.map(user => {
               return {
                  ...user,
                  userPeriod: user.userPeriod.map(date => {
                     const formattedDate = moment(date.date).format('DD.MM.YYYY')
                     return {
                        date: formattedDate,
                        schedule: date.schedule.map(time => {
                           const currentUserMeetings = usersMeetings ? usersMeetings.find(meetingsUser => meetingsUser.userId === user.userId) : []
                           const currentDateMeetings = currentUserMeetings ? currentUserMeetings.meetings.find(metting => metting.date === formattedDate && metting.time === time.time) : []

                           return {
                              ...time,
                              address: currentDateMeetings ? currentDateMeetings.address : null
                           }
                        })
                     }

                  })
               }
            })


            //proccessing
            const onlyFreeAndAddressSchedule = formattedSchedule.map(user => {
               const userBaseAddress = allUsers.find(staff => staff.id === user.userId).baseAddress
               const selectedAddress = getState().schedule.selectedAddress.addressString

               return {
                  ...user,
                  userPeriod: user.userPeriod.map(date => {
                     //filter only free time or isset address
                     const onlyFreeTime = date.schedule.filter(time => time.is_free)
                     const filteredTime = date.schedule.filter(time => {
                        const hours = +time.time.split(':')[0]
                        const minutes = +time.time.split(':')[1]
                        return hours >= 9 && hours <= 20 || hours > 18 && time.address
                     })
                     const filteredFreeTime = filteredTime.filter(time => time.is_free || !time.is_free && time.address)

                     //create roadmap
                     const filteredForRoadmap = filteredFreeTime.filter(time => !time.is_free && time.address)
                     const baseAddrObj = {
                        type: 'base',
                        address: userBaseAddress
                     }
                     filteredForRoadmap.unshift(baseAddrObj)
                     filteredForRoadmap.push(baseAddrObj)

                     const roadmapWithParamsPoints = []

                     for (let i = 0; i < filteredForRoadmap.length; i++) {
                        const thisPoint = filteredForRoadmap[i];
                        const thisPointTime = thisPoint && thisPoint.time ? +thisPoint.time.split(':')[0] : 8
                        const nextPoint = filteredForRoadmap[i + 1]
                        const nextPointTime = nextPoint && nextPoint.time ? +nextPoint.time.split(':')[0] : 20

                        //filter +/- one hour for road
                        const timeOneHourForRoad = []

                        for (let t = 0; t < filteredFreeTime.length; t++) {
                           if (filteredFreeTime[t].address) {
                              const prevRoadHour_1 = filteredFreeTime[t - 1] ? +filteredFreeTime[t - 1].time.split(':')[0] : 0
                              const prevRoadHour_2 = filteredFreeTime[t - 2] ? +filteredFreeTime[t - 2].time.split(':')[0] : 0
                              const meetRoadHour = +filteredFreeTime[t].time.split(':')[0]

                              t - 1 >= 0 && prevRoadHour_1 + 1 === meetRoadHour && timeOneHourForRoad.push(filteredFreeTime[t - 1])
                              t - 2 >= 0 && prevRoadHour_2 + 1 === meetRoadHour && timeOneHourForRoad.push(filteredFreeTime[t - 2])
                              t + 1 <= filteredFreeTime.length - 1 && timeOneHourForRoad.push(filteredFreeTime[t + 1])
                              //t+2 <= filteredFreeTime.length-1 && timeOneHourForRoad.push(filteredFreeTime[t+2])
                           }
                        }

                        const intervalTimeVars = filteredFreeTime.filter(timeVar => {
                           const numTime = +timeVar.time.split(':')[0]
                           return !timeVar.address && timeVar.time && timeVar.time !== '19:30' && numTime > thisPointTime && numTime < nextPointTime
                        })

                        const intervalTimeWithRoad = intervalTimeVars.map(time => {
                           const roadTime = timeOneHourForRoad.find(road => road.time === time.time)
                           const reserves = getState().schedule.reservedDates
                           const isReserved = reserves.find(reserve => reserve.employee == user.userId && reserve.date === date.date && reserve.time === time.time)

                           return {
                              ...time,
                              roadTime: !!roadTime,
                              isReserved: !!isReserved
                           }
                        })

                        const intervalTime = {
                           type: 'time',
                           intervals: intervalTimeWithRoad
                        }
                        const varParams = {
                           type: 'params',
                           totalDistance: null,
                           origin_1: thisPoint.address,
                           destination_1: selectedAddress,
                           origin_2: selectedAddress,
                           destination_2: nextPoint ? nextPoint.address : null,
                           params_1: null,
                           params_2: null
                        }
                        if (thisPoint.type === 'base') {
                           roadmapWithParamsPoints.push(thisPoint)
                        }
                        if (!thisPoint.type && !thisPoint.is_free && thisPoint.address) {
                           roadmapWithParamsPoints.push({
                              type: 'meeting',
                              ...thisPoint
                           })
                        }

                        //filter params before 09:00
                        if (filteredForRoadmap[i + 1] && filteredForRoadmap[i + 1].time !== '09:00') {
                           if (i !== filteredForRoadmap.length - 1) {
                              intervalTimeVars.length && roadmapWithParamsPoints.push(intervalTime)
                              varParams.destination_2 && roadmapWithParamsPoints.push(varParams)
                           }
                        }

                     }
                     // Day mettings limit
                     const isFullLoad = filteredFreeTime.filter(time => time.address).length >= 5

                     return {
                        ...date,
                        fullLoad: isFullLoad,
                        schedule: filteredFreeTime,
                        roadmap: roadmapWithParamsPoints
                     }
                  })
               }
            })

            //clear fullLoad roadmaps of time and params
            const clearRoadmaps = onlyFreeAndAddressSchedule.map(user => {
               return {
                  ...user,
                  userPeriod: user.userPeriod.map(date => {
                     if (date.fullLoad) {
                        return {
                           ...date,
                           roadmap: date.roadmap.filter(item => item.type !== 'time' && item.type !== 'params')
                        }
                     }

                     const isNineStart = date.roadmap.find(item => item.type === 'meeting' && +item.time.split(':')[0] === 9)

                     // filter if first meeting 09:00
                     if (isNineStart) {
                        return {
                           ...date,
                           roadmap: date.roadmap.map(roadItem => {
                              if (roadItem.type === 'time') {
                                 return {
                                    ...roadItem,
                                    intervals: roadItem.intervals.filter(time => time.time !== '18:30' && time.time !== '19:00')
                                 }
                              }
                              return {
                                 ...roadItem
                              }
                           })
                        }
                     }
                     return {
                        ...date
                     }
                  })
               }
            })
            //push to state
            const scheduleWithoutRoutes = {
               period: period,
               usersSchedule: clearRoadmaps
            }
            dispatch(setCalendarPeriodData(scheduleWithoutRoutes))

            // Calculate routes
            dispatch(calcRoutes())

         }
      })
   }
}

//3
const calcRoutes = () => (dispatch, getState) => {
   dispatch(toggleIsFetchingRoutes(true))
   const freeSchedule = getState().schedule.freeSchedule

   const getAddrParams = (o, d) => {
      if (o && d) {
         return new Promise(resolve => {
            return HDserviceAPI.getAddressParams(o, d).then(res => {

               if (res.data.resultCode) {
                  return resolve({
                     distanceText: res.data.distanceText,
                     distanceValue: res.data.distanceValue,
                     durationText: res.data.durationText,
                     durationValue: res.data.durationValue
                  })
               }

               return resolve({
                  errorMessage: res.errorMessage
               })

            });

         })

      }
      return null
   };

   const calcScheduleRoutes = freeSchedule.usersSchedule.map(user => {
      return new Promise(resolveUser => {
         let userPeriod = []
         user.userPeriod.map(date => {
            if (!date) {
               return []
            }
            const datePromise = new Promise(resolveDate => {
               if (date.fullLoad) {
                  resolveDate(date)
               }
               const dateData = {
                  ...date,
                  roadmap: date.roadmap.map(roadItem => {
                     return new Promise(resolveRoadItem => {
                        if (roadItem.type !== 'params') {
                           resolveRoadItem(roadItem)
                        }

                        // filter for not calc base address
                        const getFilteredAddrParams = (o, d) => {
                           const currentUser = getState().dashboard.users.find(dashUser => dashUser.id === user.userId)
                           const baseAddr = currentUser.baseAddress
                           const selectedAddress = getState().schedule.selectedAddress.addressString
                           const currentUserBaseParams = getState().schedule.selectedAddress.usersParams.find(paramsUser => paramsUser.userId === user.userId)

                           if (o === baseAddr && d === selectedAddress || o === selectedAddress && d === baseAddr) {
                              return {
                                 distanceText: currentUserBaseParams.params.distanceText,
                                 distanceValue: currentUserBaseParams.params.distanceValue,
                                 durationText: currentUserBaseParams.params.durationText,
                                 durationValue: currentUserBaseParams.params.durationValue,
                              }
                           }
                           return getAddrParams(o, d)

                        }
                        const params1 = getFilteredAddrParams(roadItem.origin_1, roadItem.destination_1)
                        const params2 = getFilteredAddrParams(roadItem.origin_2, roadItem.destination_2)

                        Promise.all([params1, params2]).then((data) => {
                           let totalDistance = null
                           if (data[0] && data[1]) {
                              totalDistance = data[0].distanceValue + data[1].distanceValue
                           }
                           const resRoadItem = {
                              ...roadItem,
                              params_1: data[0] ? data[0] : null,
                              params_2: data[1] ? data[1] : null,
                              totalDistance: totalDistance,
                              totalText: totalDistance && totalDistance.toFixed(1) + " km"
                           }
                           resolveRoadItem(resRoadItem)
                        });

                     })
                  })
               }

               Promise.all(dateData.roadmap).then((data) => {
                  const closestTrip = !date.fullLoad ? getClosestTrip(data) : 0

                  //set closest trip
                  const roadmapWithClosestTrip = data.map(item => {
                     if (item.type === "params") {
                        const isClosest = item.totalDistance === closestTrip.totalDistance
                        return {
                           ...item,
                           closestTrip: isClosest
                        }
                     }
                     return item
                  })

                  //resolve data
                  const resDateData = {
                     ...dateData,
                     closestDistance: closestTrip ? closestTrip.totalDistance : null,
                     closestText: closestTrip ? closestTrip.totalText : null,
                     roadmap: roadmapWithClosestTrip
                  }
                  resolveDate(resDateData)
               });
            })
            userPeriod.push(datePromise)
         })


         Promise.all(userPeriod).then((data) => {
            const closestDay = getClosestDay(data)

            //set closest day
            const filterPeriodOfEmpty = data.filter(day => day.closestDistance)
            const userPeriodWithClosestDay = filterPeriodOfEmpty.map(day => {
               const isClosest = day.closestDistance === closestDay.closestDistance
               isClosest && dispatch(selectDate(day.date))
               return {
                  ...day,
                  closest: isClosest
               }
               return day
            })

            const resUserData = {
               ...user,
               closestDistance: closestDay ? closestDay.closestDistance : null,
               closestText: closestDay ? closestDay.closestText : null,
               userPeriod: userPeriodWithClosestDay
            }
            resolveUser(resUserData)

         });

      })

   })

   // CALCULATED ROUTES Free Schedule
   Promise.all(calcScheduleRoutes).then((resSchedule) => {
      const closestUser = getClosestUser(resSchedule) || 0

      //set closest user
      const scheduleWithClosestUser = resSchedule.map(user => {
         const isClosest = user.closestDistance === closestUser.closestDistance
         return {
            ...user,
            closest: isClosest
         }
         return user
      })

      function sortUsersClosest(a, b) {
         if (a.closestDistance > b.closestDistance) {
            return 1;
         }
         if (a.closestDistance < b.closestDistance) {
            return -1;
         }
         return 0;
      }

      const calculatedSchedule = {
         period: getState().schedule.freeSchedule.period,
         usersSchedule: scheduleWithClosestUser.sort(sortUsersClosest).filter(user => user.closestDistance)
      }
      dispatch(setCalendarPeriodData(calculatedSchedule))
      dispatch(selectUser(closestUser.userId))
      dispatch(toggleIsFetchingRoutes(false))
      dispatch(toggleIsRoutesInit(true))

   });
}


export default scheduleReducer;