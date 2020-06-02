import React from "react";
import s from "./dashboard.module.scss";
import AddressSearchContainer from "../AddressSearch/AddressSearchContainer";
import CongestionContainer from "../Congestion/CongestionContainer";
import DatesContainer from "../Dates/DatesContainer";

const Dashboard = props => {
  return (
    <div className={s.dashboardWrap}>
      <AddressSearchContainer users={props.users} />
      <div className={s.mainGrid}>
        <div>
          <CongestionContainer />
        </div>
        <div className={s.block}>
          <DatesContainer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
