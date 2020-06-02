import React from "react";
import { NavLink } from "react-router-dom";
import s from "./header.module.scss";
import logo from "./../../assets/img/logo.svg";
import dots from "./../../assets/img/dots.svg";
import user from "./../../assets/img/user.jpg";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";

function AccountDialog(props) {
  const { onClose, open } = props;

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
      <DialogTitle id="simple-dialog-title">Юлия Татаренкова</DialogTitle>
      <List>
        <ListItem autoFocus button onClick={() => handleLogoutButton()}>
          <ListItemAvatar>
            <Avatar>
              <ExitToAppIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Выйти" />
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
              <img src={logo} alt="Prof-obivka" />
            </a>

            <div className={s.load}>
              <p>Составление, распределение маршрутов встреч</p>
            </div>
          </div>
          <div className={s.header_wrap__right}>
            <div className={s.account}>
              <div className={s.userName}>
                <p>Юлия Татаренкова</p>
                <small>Менеджер по продажам</small>
              </div>
              <a
                href="#"
                className={s.userPhoto}
                onClick={handleClickOpenLogout}
              >
                <img src={user} alt="user" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <AccountDialog
        open={openLogout}
        onClose={handleCloseLogout}
        logoutMe={props.logoutMe}
      />
    </header>
  );
};

export default Header;
