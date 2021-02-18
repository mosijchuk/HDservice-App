import React from 'react'
import {NavLink} from "react-router-dom";
import s from "./dashboard.module.scss";
import TimelineIcon from '@material-ui/icons/Timeline';

export const Dashboard = (props) => {

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
                                <h3>Расчет маршрутов</h3>
                                <p>Расчет маршрутов и расстояний, поиск сотрудника, даты и времени встречи</p>
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