import React, { useState, useEffect } from "react";
import SelectBox from "../SelectBox/SelectBox";
import s from "./../Dashboard/dashboard.module.scss";
import d from "./dates.module.scss";
import Skeleton from "@material-ui/lab/Skeleton";
import moment from "moment/min/moment-with-locales";
import Tooltip from "@material-ui/core/Tooltip";
import EventNoteIcon from "@material-ui/icons/EventNote";

const LoadingSkeleton = () => {
  const skelets = [];
  for (let i = 0; i < 10; i++) {
    skelets.push(
      <Skeleton
        key={i}
        animation="pulse"
        style={{ height: "49px", transform: "scale(1, 0.9)" }}
      />
    );
  }
  return <div>{skelets}</div>;
};

const DateItems = props => {
  const items = props.freeSchedule.map(item => {
    let date = moment(item.date, "DD.MM.YYYY").format("ddd, D MMMM");
    date = date.charAt(0).toUpperCase() + date.substr(1);

    const getPriority = () => {
      let diffDays = moment(item.date, "DD.MM.YYYY").diff(moment(), "days");

      switch (diffDays + 1) {
        case 1: {
          return 1;
        }
        case 2: {
          return 2;
        }
        case 3:
        case 4: {
          return 3;
        }
        case 5: {
          return 0;
        }
        default: {
          return 5;
        }
      }
    };
    let shortDistance =
      props.selectedAddress.distanceValue > item.params.distanceValue && true;

    let longDistance =
      props.selectedAddress.distanceValue < item.params.distanceValue && true;

    return (
      <div
        className={` ${d.item} ${d["priority_" + getPriority()]}`}
        key={item.date + item.time}
      >
        <p>
          {" "}
          {date}, {item.time}
        </p>
        <Tooltip
          title={
            item.posibleOrigin
              ? "Выезд с адреса предыдущего клиента"
              : "Выезд с базового адреса"
          }
          placement="left"
          arrow
        >
          <span
            className={`${longDistance && d.red} ${shortDistance && d.green}`}
          >
            Параметры: {item.params.durationText} {item.params.distanceText}
          </span>
        </Tooltip>
      </div>
    );
  });
  return <>{items}</>;
};

const Dates = props => {
  const handleSelect = period => {
    props.getSchedule(period);
  };

  return (
    <>
      <div className={s.blockHeader}>
        <h2>Свободное время встречи:</h2>
        <div>
          <SelectBox
            name={"meetingsUser"}
            handleSelect={handleSelect}
            disabled={
              props.isFetchingSchedule || !props.selectedAddress.distanceValue
            }
            data={[
              {
                name: "Ближайшие 7 дней",
                value: 7
              },
              {
                name: "Ближайшие 14 дней",
                value: 14
              },
              {
                name: "Ближайшие 30 дней",
                value: 30
              }
            ]}
          />
        </div>
      </div>
      <div className={d.datesWrap}>
        {!props.freeSchedule.length && !props.isFetchingSchedule && (
          <div>
            <EventNoteIcon
              style={{
                color: "rgb(245, 245, 245)",
                width: "100%",
                height: "300px"
              }}
            />
          </div>
        )}
        {props.freeSchedule.length > 0 && !props.isFetchingSchedule && (
          <DateItems
            freeSchedule={props.freeSchedule}
            selectedAddress={props.selectedAddress}
          />
        )}
        {props.isFetchingSchedule && <LoadingSkeleton />}
      </div>
    </>
  );
};

export default Dates;
