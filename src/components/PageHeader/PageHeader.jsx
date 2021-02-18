import React, {useEffect, useState} from "react";
import s from "./../scss/components.module.scss";
import c from "./calendar.module.scss";
import DayPicker from "react-day-picker";
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/ru';
import moment from "moment/min/moment-with-locales";
import SelectBox from "../SelectBox/SelectBox";
import FetchingCongestionProgress from "../Congestion/FetchingCongestionProgress";

const StyledCalendar = ({holidays, userMeetings}) => {

    const [selectedDayMeetings, setSelectedDayMeetings] = useState([])
    const [selectedDay, setSelectedDay] = useState(null)

    useEffect(() => {
        setSelectedDay(null)
        setSelectedDayMeetings([])
    }, [userMeetings])

    //array loaded day dates
    const meetDates = userMeetings.map(meet => meet.date)
    const uniqueDates = [...new Set(meetDates)]
    const filteredMeetingDates = uniqueDates.filter(date => {
        if (moment(date, "DD.MM.YYYY").diff(moment(), 'days') >= 0) {
            return date
        }
    })
    const meetingDates = filteredMeetingDates.map(date => moment(date, "DD.MM.YYYY").toDate()) //to native date

    const modifiers = {
        holidays: {daysOfWeek: holidays},
        today: new Date(),
        workingDays: meetingDates
    };
    const modifiersStyles = {
        today: {
            color: '#ffc107',
        },
        workingDays: {
            color: '#ffffff',
            backgroundColor: '#ffc107'
        },
        holidays: {
            color: '#dcdcdc'
        },
    };

    const findDayMeetings = date => {
        const dayMeetings = userMeetings.filter(meeting => meeting.date == date)

        dayMeetings.sort(function (a, b) {
            //  сортируем по time
            if (+/\d+/.exec(a.time) < +/\d+/.exec(b.time)) return -1;
            if (+/\d+/.exec(a.time) > +/\d+/.exec(b.time)) return 1;
            return 0;
        });
        setSelectedDay(date)
        setSelectedDayMeetings(dayMeetings)
    }

    const dayClickHandler = (date, modifiers) => {
        const momentDate = moment(date).format('L')
        if (modifiers && modifiers.workingDays) {
            findDayMeetings(momentDate)
        } else {
            setSelectedDay(null)
            setSelectedDayMeetings([])
        }
    }

    const getSelectedDayString = () => {
        if (selectedDay) {
            let dateChoosed = moment(selectedDay, "DD.MM.YYYY").format("ddd, D MMMM");
            return dateChoosed.charAt(0).toUpperCase() + dateChoosed.substr(1)
        }
    }


    return (
        <>
            <DayPicker
                localeUtils={MomentLocaleUtils}
                locale="ru" modifiers={modifiers}
                modifiersStyles={modifiersStyles}
                onDayClick={dayClickHandler}
            />
            {selectedDay && (
                <div className={c.selectedDayWrap}>
                    <h3>{getSelectedDayString()}</h3>

                    <div className={c.calendarDayItems}>
                        {selectedDayMeetings.map((meeting, index) => (
                                <div key={index} className={c.item}>
                                    <strong>{meeting.time}, {meeting.stage}</strong>
                                    <p>{meeting.address}</p>
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}

        </>
    );
}


const Calendar = props => {
    const weekDays = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']

    const holidayNumbers = props.userHolidays.map(day => {
        return weekDays.findIndex(weekDay => day == weekDay)
    })

    return (
        <div className={`${s.block} ${s.blockSecondary}`}>
            <style>{`
            .DayPicker-Month {
                border-spacing: 7px;
                border-collapse: separate;
            }
            .DayPicker *:focus {
                    outline:none;
            }
             .DayPicker-Day {
                  padding: 0.5em 0.6em;
                }
                .DayPicker-Day--workingDays {
                transition: all 0.3s;
                }
                  .DayPicker-Day--workingDays:hover {
                    background-color: #f0bd65 !important;
                }
                .DayPicker-Month {
                    margin: 0;
                    margin-top: 0;
                }
          `}</style>
            <div className={s.blockHeader}>
                <h2>Рабочий график сотрудника:</h2>
                <span className={c.userNameSpan}>{props.userName}</span>
            </div>

            <StyledCalendar holidays={holidayNumbers} userMeetings={props.userMeetings}/>
        </div>
    );
};

export default Calendar;
