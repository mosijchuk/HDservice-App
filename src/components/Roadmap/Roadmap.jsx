import React, {useState, useEffect} from "react";
import s from "./roadmap.module.scss";
import HomeIcon from '@material-ui/icons/Home';
import moment from "moment/min/moment-with-locales";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "@material-ui/lab";
import { v4 as uuidv4 } from 'uuid';

const SnackBarAlert = props => {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
            }}
            open={props.openAlert}
            autoHideDuration={3000}
            onClose={props.handleCloseAlert}
        >
            <Alert onClose={props.handleCloseAlert} severity={props.severity}>
                {props.alertMessage}
            </Alert>
        </Snackbar>
    )
}

const RoadItem = ({item, reserveTime, setAlertMessage, setAlertSeverity, setOpenAlert}) => {

    if (!item && !item.type) {
        return <></>
    }

    if (item.type === 'base') {
        return (
            <>
                <div className={`${s.roadItem} ${s.left}`}>
                    <p>Home</p>
                </div>
                <div className={s.pointWrap}>
                    <HomeIcon/>
                </div>
                <div className={`${s.roadItem} ${s.right}`}>
                    <p>{item.address}</p>
                </div>
            </>
        )
    }

    if (item.type === 'time') {
        return (
            <div className={`${s.roadItem} ${s.half} ${s.timeWrap}`}>
                {item.intervals && item.intervals.map(time => {
                        const handlerReserve = () => {
                            reserveTime(time.time).then(res => {
                                setAlertMessage(res.resultCode == 1 || res.resultCode == 2 ? res.message : 'Server error')
                                setAlertSeverity(res.resultCode == 1 ? 'success' : 'error')

                                setOpenAlert(true)
                            })
                        }

                        return (
                            <a key={uuidv4()} onClick={handlerReserve}
                               className={`${s.timeLink} ${time.roadTime ? s.roadTime : ''} ${time.isReserved ? s.reservedTime : ''}`}>
                                <p>{time.time}</p>
                            </a>
                        )
                    }
                )}
            </div>
        )
    }

    if (item.type === 'empty') {
        return (
            <div className={`${s.roadItem} ${s.half} ${s.emptyWrap}`}>
                <p>No free time options</p>
            </div>
        )
    }

    if (item.type === 'params') {
        return (
            <>
                <div className={s.pointWrap}>
                    <span className={`${s.point} ${item.closestTrip ? s.green : s.grey}`}></span>
                </div>
                <div className={`${s.roadItem} ${s.half} ${s.paramsWrap}`}>
                    <p className={`${item.closestTrip ? s.greenText : s.greyText}`}>{item.params_1 ? item.params_1.distanceText + ', ' + item.params_1.durationText : '-'}</p>
                    <p className={`${item.closestTrip ? s.greenText : s.greyText}`}>{item.destination_1 ? item.destination_1 : '-'}</p>
                    <p className={`${item.closestTrip ? s.greenText : s.greyText}`}>{item.params_2 ? item.params_2.distanceText + ', ' + item.params_2.durationText : '-'}</p>
                </div>
            </>

        )
    }

    if (item.type === 'meeting') {
        return (
            <>
                <div className={`${s.roadItem} ${s.left}`}>
                    <p>Meeting at {item.time}</p>
                </div>
                <div className={s.pointWrap}>
                    <span className={s.point}></span>
                </div>
                <div className={`${s.roadItem} ${s.right}`}>
                    <p>{item.address}</p>
                </div>
            </>
        )
    }

}
const Roadmap = props => {
    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');
    const [alertSeverity, setAlertSeverity] = React.useState('success');

    if (!props.selectedUser || !props.selectedDate || !props.freeSchedule) {
        return <></>
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenAlert(false);
    };

    const userSchedule = props.freeSchedule.find(user => user.userId === props.selectedUser)
    const userDate = userSchedule && userSchedule.userPeriod.find(day => day.date === props.selectedDate)
    const userDateRoadmap = userDate && userDate.roadmap

    if (!userDateRoadmap) {
        return <></>
    }


    return (
        <>
            <div className={s.roadmap}>
                <div className={s.blockHeader}>
                    <h3>Roadmap</h3>
                    <span>{props.selectedUserName}, {moment(props.selectedDate, 'DD.MM.YYYY').format('dddd, D MMMM')}</span>
                </div>
                <div className={s.roadmapWrap}>
                    {userDateRoadmap.map((item, i, roadmap) => {
                        let prevEmpty = false;

                        if (item.type === 'params' && roadmap[i - 1] && roadmap[i - 1].type !== 'time') {
                            prevEmpty = true
                        }

                        return (
                            <>
                                {prevEmpty && (<RoadItem key={uuidv4()} item={{type: 'empty'}}/>)}
                                <RoadItem
                                    key={uuidv4()}
                                    item={item}
                                    reserveTime={props.createTimeReserve}
                                    setOpenAlert={setOpenAlert}
                                    setAlertMessage={setAlertMessage}
                                    setAlertSeverity={setAlertSeverity}/>
                            </>
                        )

                    })}
                </div>
            </div>
            <SnackBarAlert openAlert={openAlert} handleCloseAlert={handleCloseAlert} alertMessage={alertMessage}
                           severity={alertSeverity}/>
        </>
    );
};

export default Roadmap;
