import React from "react";
import Roadmap from "./Roadmap";
import {connect} from "react-redux";
import {getSchedule, setIsOnlyBase, createTimeReserve, selectAddress, selectDate} from "../../redux/scheduleReducer";

const RoadmapContainer = props => {
    if (!props.selectedUser || !props.selectedDate || !props.freeSchedule) {
        return <></>
    }
    return <Roadmap {...props} />;
};

const mapStateToProps = state => ({
    selectedUser: state.schedule.selectedUser.id,
    selectedUserName: state.schedule.selectedUser.name,
    selectedDate: state.schedule.selectedDate.date,
    freeSchedule: state.schedule.freeSchedule.usersSchedule,
    isFetchingSchedule: state.schedule.isFetchingSchedule,
});

export default connect(mapStateToProps, {selectDate, setIsOnlyBase, createTimeReserve})(RoadmapContainer);
