import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import AddressSearch from "./AddressSearch";
import {
  findAddress,
  selectUser,
  selectAddress,
  clearAddress
} from "../../redux/scheduleReducer";

const AddressSearchContainer = props => {
  const closestDistance = props.freeSchedule.length && props.freeSchedule.find(eachUser => eachUser.closest).closestDistance
  return <AddressSearch {...props} closestDistance={closestDistance}/>;
};

const mapStateToProps = state => ({
  searchResults: state.schedule.searchResults,
  selectedUser: state.schedule.selectedUser,
  selectedAddress: state.schedule.selectedAddress,
  selectedDepartment: state.dashboard.selectedDepartment,
  freeSchedule: state.schedule.freeSchedule,
  isFetchingAddress: state.schedule.isFetchingAddress,
  isFetchingMeetings: state.schedule.isFetchingMeetings,
  isFetchingSchedule: state.schedule.isFetchingSchedule,
  isFetchingRoutes: state.schedule.isFetchingRoutes
});

export default connect(mapStateToProps, {
  findAddress,
  selectUser,
  selectAddress,
  clearAddress
})(AddressSearchContainer);
