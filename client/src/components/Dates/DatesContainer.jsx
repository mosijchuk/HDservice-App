import React from "react";
import Dates from "./Dates";
import { connect } from "react-redux";
import {getSchedule, setIsOnlyBase, createTimeReserve, selectAddress, selectDate} from "../../redux/scheduleReducer";

const DatesContainer = props => {
const selectedUserBaseAddress = props.selectedAddress.usersParams && props.selectedAddress.usersParams.find(eachParams => eachParams.userId === props.selectedUser.id).params
  return <Dates {...props} selectedUserBaseAddress={selectedUserBaseAddress} />;
};

const mapStateToProps = state => ({
  selectedUser: state.schedule.selectedUser,
  selectedDate: state.schedule.selectedDate,
  selectedAddress: state.schedule.selectedAddress,
  selectedPeriod: state.schedule.freeSchedule.period,
  freeSchedule: state.schedule.freeSchedule,
  isFetchingSchedule: state.schedule.isFetchingSchedule,
  isOnlyBaseRoute: state.schedule.isOnlyBaseRoute,
  selectedDepartment: state.dashboard.selectedDepartment
});

export default connect(mapStateToProps, {selectDate, setIsOnlyBase, createTimeReserve })(DatesContainer);
