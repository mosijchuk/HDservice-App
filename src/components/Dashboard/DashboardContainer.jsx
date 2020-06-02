import React from "react";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import HeaderContainer from "../Header/HeaderContainer";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

const DashboardContainer = props => {
  return (
    <>
      <HeaderContainer />
      <Dashboard users={props.users} />
    </>
  );
};

let mapStateToProps = state => ({
  users: state.dashboard.users
});

export default withAuthRedirect(
  connect(mapStateToProps, {})(DashboardContainer)
);
