import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import EmployeesPanel from "./EmployeesPanel";
import {
  selectUser
} from "../../redux/scheduleReducer";

const EmployeesPanelContainer = props => {
  return <EmployeesPanel {...props} />;
};

const mapStateToProps = state => ({
  searchResults: state.schedule.searchResults,
  selectedUser: state.schedule.selectedUser,
  selectedAddress: state.schedule.selectedAddress,
  freeSchedule: state.schedule.freeSchedule,
  prevAction: state.schedule.prevAction,
  isFetchingAddress: state.schedule.isFetchingAddress,
  isFetchingMeetings: state.schedule.isFetchingMeetings
});

export default connect(mapStateToProps, {
  selectUser
})(EmployeesPanelContainer);
