import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import AddressSearch from "./AddressSearch";
import {
  findAddress,
  selectUser,
  selectAddress,
  clearAddress,
  getFreeSchedule
} from "../../redux/scheduleReducer";

const AddressSearchContainer = props => {
  return <AddressSearch {...props} />;
};

const mapStateToProps = state => ({
  searchResults: state.schedule.searchResults,
  selectedUser: state.schedule.selectedUser,
  selectedAddress: state.schedule.selectedAddress,
  isFetchingAddress: state.schedule.isFetchingAddress,
  isFetchingMeetings: state.schedule.isFetchingMeetings
});

export default connect(mapStateToProps, {
  findAddress,
  selectUser,
  selectAddress,
  clearAddress,
  getFreeSchedule
})(AddressSearchContainer);
