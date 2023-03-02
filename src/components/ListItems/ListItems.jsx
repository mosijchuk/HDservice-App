import React from "react";
import s from "./listitems.module.scss"
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import TimelineIcon from '@material-ui/icons/Timeline';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';

const ListItem = ({item, handler}) => {

    const selectThisUser = () => {
        handler(false, item.id)
    }

    if(!item) {
        return <></>
    }
    return (
        <a onClick={selectThisUser} className={`${s.Item} ${item.active ? s.active : ""}`}>
            <span className={s.name}>{item.name}</span>
            <span className={s.note}>
                {item.note === "closest" && (<LocalActivityIcon className={s.greenColor} />)}
                {item.note === "full" && (<PlaylistAddCheckIcon className={s.mainColor}/>)}
                {item.note === "linear" && (<TimelineIcon className={s.mainTransparentColor} />)}
            </span>
            <span className={`${s.params} ${item.value > 30 ? s.warning : ""}`}>{item.value ? item.valueText : "-"}</span>
        </a>
    )
}

const ListItems = ({items, handler}) => {
    if(!items) {
        return <></>
    }
    return (
        <div className={s.ListItems}>
            {
                items.map(item=>{
                    return (
                        <ListItem key={item.name+item.value} item={item} handler={handler} />
                    )
                })
            }
        </div>
    )
}

export default ListItems