import React, {useEffect} from "react";
import { connect } from "react-redux";
import Routes from "./Routes";
import HeaderContainer from "../Header/HeaderContainer";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import {selectDefaultScheduleState, loadScheduleCore} from "../../redux/scheduleReducer";

const RoutesContainer = props => {

    const RoutesUsers = props.users

    useEffect(() => {

        // clear state on component unmount
        return () => {
          props.selectDefaultScheduleState()
        }
    }, [])

  return (
    <>
      {/*<HeaderContainer />*/}
      <Routes users={RoutesUsers} />
    </>
  );
};

const mapStateToProps = state => ({
  users: state.dashboard.users
});

export default withAuthRedirect(
  connect(mapStateToProps, {selectDefaultScheduleState})(RoutesContainer)
);
