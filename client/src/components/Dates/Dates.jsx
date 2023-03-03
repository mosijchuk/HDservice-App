import React, {useState, useEffect} from "react";
import s from "./dates.module.scss";
import moment from "moment/min/moment-with-locales";
import ListItems from "../ListItems/ListItems";

const Dates = props => {
    const handleChange = (event, date) => {
        props.selectDate(date);
    };

    const userDates = props.freeSchedule.usersSchedule && props.freeSchedule.usersSchedule.find(scheduleUser => scheduleUser.userId === props.selectedUser.id)

    if (!props.selectedUser || !props.freeSchedule.usersSchedule) {
        return <>Employee not selected</>
    }
    if (!userDates) {
        return <></>
    }
    const panelDatesList = userDates.userPeriod.map(day => {
        const isActive = props.selectedDate.date === day.date;
        let stringDate = moment(day.date, 'DD.MM.YYYY').format('ddd, D MMMM');
        stringDate = stringDate[0].toUpperCase() + stringDate.substring(1);
        let note;
        if (day.closest) {
            note = "closest"
        }
        if (!day.closestText && !day.fullLoad) {
            note = "empty"
        }
        if (!day.closest && day.closestText) {
            note = "linear"
        }
        if (day.fullLoad) {
            note = "full"
        }

        return {
            id: day.date,
            name: stringDate,
            value: day.closestDistance,
            valueText: day.closestText,
            active: isActive,
            closest: day.closest,
            note: note
        }
    })

    return (
        <div className={s.dates}>
            <div className={s.blockHeader}>
                <h3>Work schedule</h3>
                <span>{props.selectedUser.name}</span>
            </div>
            <div className={s.wrapper}>
                <ListItems items={panelDatesList} handler={handleChange}/>
            </div>

        </div>
    );
};

export default Dates;
