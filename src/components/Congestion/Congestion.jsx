import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import SelectBox from "../SelectBox/SelectBox";
import s from "./../Dashboard/dashboard.module.scss";
import FetchingCongestionProgress from "./FetchingCongestionProgress";

const Congestion = props => {
  const options = {
    series: [
      {
        name: "Назначенных встреч",
        data: props.chartData.values
      }
    ],
    xaxis: {
      categories: props.chartData.users,
      tickAmount: 1,
      labels: {
        formatter: function(value) {
          return value;
        }
      }
    },
    yaxis: {
      decimalsInFloat: false,
      labels: {
        formatter: function(value) {
          return value;
        }
      }
    },
    axisTicks: {
      show: false
    },
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 0.77
        }
      }
    },
    chart: {
      type: "bar",
      height: 250,
      toolbar: {
        show: false
      }
    },
    theme: {
      monochrome: {
        enabled: true,
        color: "#fcc25f",
        shadeTo: "light",
        shadeIntensity: 0.65
      }
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    dataLabels: {
      enabled: false
    }
  };

  const handleSelect = period => {
    props.setPeriod(period);
  };

  return (
    <div className={s.block}>
      <div className={s.blockHeader}>
        <h2>Загруженность:</h2>
        <div className={s.selectBoxWrap}>
          <SelectBox
            name={"congestionUser"}
            handleSelect={handleSelect}
            data={props.selectBoxData}
          />
          <FetchingCongestionProgress />
        </div>
      </div>
      <div
        style={{
          width: "400px",
          marginTop: "-26px"
        }}
      >
        <Chart options={options} series={options.series} type="bar" />
      </div>
    </div>
  );
};

export default Congestion;
