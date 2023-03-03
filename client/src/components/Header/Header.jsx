import React from "react";
import s from "./header.module.scss";
import logo from "../../assets/img/logo.svg";
import PropTypes from "prop-types";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Fav from "../../assets/img/fav.png"
import PageHeader from "../PageHeader/PageHeader";

function AccountDialog(props) {
    const {onClose, open} = props;

    const handleCloseLogout = () => {
        onClose();
    };

    const handleLogoutButton = () => {
        props.logoutMe();
    };

    return (
        <Dialog
            onClose={handleCloseLogout}
            aria-labelledby="simple-dialog-title"
            open={open}
        >
            <DialogTitle id="simple-dialog-title">{props.userName || "Manager"}</DialogTitle>
            <List>
                <ListItem autoFocus button onClick={() => handleLogoutButton()}>
                    <ListItemAvatar>
                        <Avatar>
                            <ExitToAppIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Log out"/>
                </ListItem>
            </List>
        </Dialog>
    );
}

AccountDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};

const Header = props => {
    const [openLogout, setOpen] = React.useState(false);

    const handleClickOpenLogout = e => {
        e.preventDefault();
        setOpen(true);
    };

    const handleCloseLogout = value => {
        setOpen(false);
    };
    return (
        <header className={s.header}>
            <div className={s.container}>
                <div className={s.header_wrap}>
                    <div className={s.header_wrap__left}>
                        <a href="/">
                            <img src={logo} alt="HD service"/>
                        </a>
                    </div>

                    <PageHeader headerName={props.headerName} description={props.description} back={props.back}/>

                    <div className={s.header_wrap__right}>
                        <div className={s.account}>
                            <div className={s.userName}>
                                <p>{props.userName || "Manager"}</p>
                                <small>{props.userProfession || "HD service"}</small>
                            </div>
                            <a
                                href="#"
                                className={s.userPhoto}
                                onClick={handleClickOpenLogout}
                            >
                                <img src={Fav} alt="user"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <AccountDialog
                open={openLogout}
                onClose={handleCloseLogout}
                logoutMe={props.logoutMe}
                userName={props.userName}
            />
        </header>
    );
};

export default Header;
