import React, { useEffect } from "react";
import { connect } from "react-redux";
import {Dashboard} from "./Dashboard";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {selectDefaultScheduleState} from "../../redux/scheduleReducer";
import HeaderContainer from "../Header/HeaderContainer";

const DashboardContainer = ({selectedDepartment, updateDepartment}) => {
  const headerName = "Все функции"
  const description = {
    name: 'Количество функций',
    value: 1
  }

  useEffect(() => {
    selectedDepartment && updateDepartment()
  }, []);


  return (
      <>
        <HeaderContainer headerName={headerName} description={description} back={false}/>
        <Dashboard />
      </>

  );
};

const mapStateToProps = state => ({
  selectedDepartment: state.dashboard.selectedDepartment
});

export default withAuthRedirect(
    connect(mapStateToProps, { })(
        DashboardContainer
    )
);

