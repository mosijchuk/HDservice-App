import React from 'react'
import {NavLink} from "react-router-dom";
import s from "./functions.module.scss";
import TimelineIcon from '@material-ui/icons/Timeline';

export const Functions = (props) => {

    return (
        <>
            <div className={s.dashboardWrap}>
                <div className={s.itemsWrap}>
                    <NavLink to={'/routes'}>
                        <div className={s.item}>
                            <div className={s.iconWrap}>
                                <TimelineIcon />
                            </div>
                            <div className={s.nameWrap}>
                                <h3>Route calculation</h3>
                                <p>Calculation of routes and distances, search for an employee, date and time of the meeting</p>
                            </div>
                        </div>
                    </NavLink>
                    <div className={`${s.item} ${s.transparent}`} />
                    <div className={`${s.item} ${s.transparent}`} />
                    <div className={`${s.item} ${s.transparent}`} />
                </div>
            </div>

        </>
    )
}