import React, {useEffect} from "react";
import {connect} from "react-redux";
import Routes from "./Routes";
import HeaderContainer from "../Header/HeaderContainer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {selectDefaultScheduleState, loadScheduleCore} from "../../redux/scheduleReducer";

const RoutesContainer = props => {
    const headerName = "Route calculation"
    const description = {
        name: 'Deliverymen in the company',
        value: props.users && props.users.length || 0
    }

    const RoutesUsers = props.users

    useEffect(() => {

        // clear state on component unmount
        return () => {
            props.selectDefaultScheduleState()
        }
    }, [])

    return (
        <>
            <HeaderContainer headerName={headerName} description={description} back={true}/>
            <Routes users={RoutesUsers} isRoutesInit={props.isRoutesInit}/>
        </>
    );
};

const mapStateToProps = state => ({
    users: state.dashboard.users,
    isRoutesInit: state.schedule.isRoutesInit
});

export default withAuthRedirect(
    connect(mapStateToProps, {selectDefaultScheduleState})(RoutesContainer)
);
