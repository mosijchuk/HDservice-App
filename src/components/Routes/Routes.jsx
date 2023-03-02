import React from "react";
import s from "./routes.module.scss";
import AddressSearchContainer from "../AddressSearch/AddressSearchContainer";
import DatesContainer from "../Dates/DatesContainer";
import EmployeesPanelContainer from "../EmployeesPanel/EmployeesPanelContainer";
import RoadmapContainer from "../Roadmap/RoadmapContainer";
import CityImageContainer from "../CityImage/CityImageContainer";

const Routes = props => {
  return (
    <div className={s.dashboardWrap}>
           <AddressSearchContainer users={props.users} />

        {props.isRoutesInit ? (
            <div className={s.mainGrid}>
                <div>
                    <EmployeesPanelContainer users={props.users} />
                </div>
                <div>
                    <DatesContainer />
                </div>
                <RoadmapContainer  />
            </div>
        ) : (
            <CityImageContainer />
        )}


    </div>
  );
};

export default Routes;
