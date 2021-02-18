import React, {useEffect, useState} from "react";
import s from "./moscowimage.module.scss";
import map from "./../../assets/img/map.svg"
import SearchIcon from '@material-ui/icons/Search';
import PeopleIcon from '@material-ui/icons/People';
import EventNoteIcon from '@material-ui/icons/EventNote';

const RandomPoint = () => {
    const [left, setLeft] = useState(Math.floor(Math.random() * 400) + 50)
    const [top, setTop] = useState(Math.floor(Math.random() * 400) + 50)
    let interval;

    useEffect(()=> {
        interval = setInterval(()=>{
            setLeft(Math.floor(Math.random() * 300) + 50)
            setTop(Math.floor(Math.random() * 300) + 50)
        }, 50)

        return () => {
            clearInterval(interval)
        };
    },[])

    return (
        <>
            <div className={s.routePoint} style={{left: left, top: top}}></div>
        </>
    )
}

const CityImage = props => {
    return (
        <div className={s.moscowImageWrap}>
            <div className={s.mapWrap}>
                <img src={map} alt="Moscow"/>

                {props.isFetchingMeetings && (
                    <div className={s.scheduleWrap}>
                        <PeopleIcon/>
                    </div>
                )}

                {props.isFetchingSchedule && (
                    <div className={s.scheduleWrap}>
                        <EventNoteIcon />
                    </div>
                )}

                {props.isFetchingAddress && (
                    <div className={s.findWrap}>
                        <SearchIcon/>
                    </div>
                )}

                {props.isFetchingRoutes && (
                    <RandomPoint />
                )}
            </div>
        </div>
    );
};

export default CityImage;
