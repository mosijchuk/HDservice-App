import React, { useState, useRef, useEffect } from "react";
import s from "./employeesPanel.module.scss";
import ListItems from "../ListItems/ListItems";


const EmployeesPanel = props => {

    const handleChange = (event, userId) => {
        props.selectUser(userId);
    };

    if(!props.selectedUser) {
        return <></>
    }

    const panelUsersList = props.freeSchedule.usersSchedule && props.freeSchedule.usersSchedule.map(scheduleUser => {
        const userDash = props.users.find(dashUser => dashUser.id === scheduleUser.userId)
        const isActive = props.selectedUser.id === scheduleUser.userId
        let note
        if (scheduleUser.closest) {
            note = "closest"
        }
        if (!scheduleUser.closestText) {
            note = "empty"
        }
        if (!scheduleUser.closest && scheduleUser.closestText) {
            note = "linear"
        }
        return {
            id: scheduleUser.userId,
            name: userDash ? userDash.name : "Name not found",
            value: scheduleUser.closestDistance,
            valueText: scheduleUser.closestText,
            active: isActive,
            closest: scheduleUser.closest,
            note: note
        }
    })

  return (
    <div className={s.employeesPanel}>
        <div className={s.blockHeader}>
            <h3>Deliverymen</h3>
            <span>{props.freeSchedule.usersSchedule.length} deliverymen calculated</span>
        </div>
        <div className={s.wrapper}>
            <ListItems items={panelUsersList} handler={handleChange}/>
        </div>
    </div>
  );
};

export default EmployeesPanel;
