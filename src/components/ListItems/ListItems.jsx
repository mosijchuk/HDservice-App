import React from "react";
import s from "./listitems.module.scss"

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
            <span className={s.note}>-</span>
            <span className={s.params}>{item.value ? item.value : "-"}</span>
        </a>
    )
}

const ListItems = ({items, handler}) => {

    // items = [
    //     {
    //         name: "Сотрудник",
    //         value: "25 km",
    //         active: true
    //     },
    //     {
    //         name: "Сотрудник 2",
    //         value: null,
    //         active: false
    //     }
    // ]

    if(!items) {
        return <></>
    }
    return (
        <div className={s.ListItems}>
            {
                items.map(item=>{
                    return (
                        <ListItem item={item} handler={handler} />
                    )
                })
            }
        </div>
    )
}

export default ListItems