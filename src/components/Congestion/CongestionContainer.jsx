import React, { useEffect } from "react";
import { connect } from "react-redux";
import Congestion from "./Congestion";
import { setPeriod, updateChart } from "../../redux/congestionReducer";
import moment from "moment/min/moment-with-locales";

const CongestionContainer = props => {
  const selectBoxData = [
    {
      name: "Текущая неделя",
      value: "currentWeek"
    },
    {
      name: "Текущий месяц",
      value: "currentMonth"
    },
    {
      name: "Следующий месяц",
      value: "nextMonth"
    }
  ];

  let chartData = {
    users: props.meetingsUsers.map(user => user.userName),
    values: props.meetingsUsers.map(user => user.meetings.length)
  };

  useEffect(() => {
    props.selectedPeriod.length > 0 && props.updateChart();
  }, [props.selectedPeriod]);

  useEffect(() => {}, [props.meetingsUsers]);

  return (
    <Congestion
      {...props}
      selectBoxData={selectBoxData}
      chartData={chartData}
    />
  );
};

let mapStateToProps = state => ({
  selectedPeriod: state.congestion.selectedPeriod,
  meetingsUsers: state.congestion.meetingsUsers
});

export default connect(mapStateToProps, { setPeriod, updateChart })(
  CongestionContainer
);
