import React, {useEffect} from "react";
import {connect} from "react-redux";
import CityImage from "./CityImage";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

const CityImageContainer = props => {
    return (
        <>
            <CityImage {...props}/>
        </>
    );
};

const mapStateToProps = state => ({
    isFetchingAddress: state.schedule.isFetchingAddress,
    isFetchingMeetings: state.schedule.isFetchingMeetings,
    isFetchingSchedule: state.schedule.isFetchingSchedule,
    isFetchingRoutes: state.schedule.isFetchingRoutes
});

export default withAuthRedirect(
    connect(mapStateToProps, {})(CityImageContainer)
);
