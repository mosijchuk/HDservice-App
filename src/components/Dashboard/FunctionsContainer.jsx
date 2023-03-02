import React, { useEffect } from "react";
import { connect } from "react-redux";
import {Functions} from "./Functions";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {selectDefaultScheduleState} from "../../redux/scheduleReducer";
import HeaderContainer from "../Header/HeaderContainer";

const FunctionsContainer = ({selectedDepartment, updateDepartment}) => {
  const headerName = "All functions"
  const description = {
    name: 'Functions count',
    value: 1
  }

  useEffect(() => {
    selectedDepartment && updateDepartment()
  }, []);


  return (
      <>
        <HeaderContainer headerName={headerName} description={description} back={false}/>
        <Functions />
      </>

  );
};

const mapStateToProps = state => ({
  selectedDepartment: state.dashboard.selectedDepartment
});

export default withAuthRedirect(
    connect(mapStateToProps, { })(
        FunctionsContainer
    )
);

