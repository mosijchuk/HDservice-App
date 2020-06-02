import React from "react";
import Dates from "./Dates";
import { connect } from "react-redux";
import { getSchedule } from "../../redux/scheduleReducer";

const DatesContainer = props => {
  return <Dates {...props} />;
};

const mapStateToProps = state => ({
  selectedAddress: state.schedule.selectedAddress,
  selectedPeriod: state.schedule.calendar.period,
  freeSchedule: state.schedule.freeSchedule,
  isFetchingSchedule: state.schedule.isFetchingSchedule
});

export default connect(mapStateToProps, { getSchedule })(DatesContainer);
