import React, {useState, useEffect} from "react";
import SelectBox from "../SelectBox/SelectBox";
import s from "./dates.module.scss";
import d from "./dates.module.scss";
import Skeleton from "@material-ui/lab/Skeleton";
import moment from "moment/min/moment-with-locales";
import Tooltip from "@material-ui/core/Tooltip";
import EventNoteIcon from "@material-ui/icons/EventNote";
import {makeStyles} from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import ListItems from "../ListItems/ListItems";


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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


const Dates = props => {
    const [tabValue, setTabValue] = React.useState(0);

    const handleChange = (event, date) => {
        setTabValue(date)
    };

    //first load select date
    useEffect(() => {
        handleChange(false, tabValue)
    }, [])

    //state select date
    useEffect(() => {
        props.selectDate(tabValue);
    }, [tabValue])


    const userDates = props.freeSchedule.usersSchedule && props.freeSchedule.usersSchedule.find(scheduleUser => scheduleUser.userId === props.selectedUser.id)

    if (!props.selectedUser || !props.freeSchedule.usersSchedule) {
        return <>Не выбран сотрудник</>
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
            value: day.closestText,
            active: isActive,
            closest: day.closest,
            note: note
        }
    })


    return (
        <div className={s.dates}>
            <div className={s.wrapper}>
                <ListItems items={panelDatesList} handler={handleChange}/>
            </div>

        </div>
    );
};

export default Dates;
