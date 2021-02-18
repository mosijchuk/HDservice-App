import React from "react";
import s from "./Routes.module.scss";
import AddressSearchContainer from "../AddressSearch/AddressSearchContainer";
import CongestionContainer from "../Congestion/CongestionContainer";
import DatesContainer from "../Dates/DatesContainer";
import {NavLink} from "react-router-dom";
import CalendarContainer from "../Calendar/CalendarContainer";
import PageHeader from "../PageHeader/PageHeader";
import EmployeesPanel from "../EmployeesPanel/EmployeesPanel";
import EmployeesPanelContainer from "../EmployeesPanel/EmployeesPanelContainer";
import DiagnosticContainer from "../Diagnostic/DiagnosticContainer";

const Routes = props => {
    const headerName="Расчет маршрутов"
    const description = {
        name: 'Клинеров в штате',
        value: props.users && props.users.length || 0
    }
  return (
    <div className={s.dashboardWrap}>
      {/*<PageHeader headerName={headerName} description={description} back={true}/>*/}
      <AddressSearchContainer users={props.users} />
      {/*<EmployeesPanelContainer users={props.users} />*/}
      {/*<div className={s.mainGrid}>*/}
      {/*  <div>*/}
      {/*      /!*<CalendarContainer />*!/*/}
      {/*  </div>*/}
      {/*  <div className={`${s.block} ${s.dates}`}>*/}
      {/*    <DatesContainer />*/}
      {/*  </div>*/}
      {/*    <div>*/}
      {/*        /!*<CongestionContainer  />*!/*/}
      {/*    </div>*/}
      {/*</div>*/}
    </div>
  );
};

export default Routes;
