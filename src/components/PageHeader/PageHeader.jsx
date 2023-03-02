import React, {useEffect, useState} from "react";
import c from "./pageHeader.module.scss";
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppsIcon from '@material-ui/icons/Apps';
import {NavLink} from "react-router-dom";

const useStyles = makeStyles((theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
            textDecoration: 'none'
        },
    }),
);


const PageHeader = props => {
    const classes = useStyles();

    if(!props.headerName) {
        return (<></>)
    }
    return (
        <div className={c.pageHeader}>
            <div className={c.mainWrap}>
                <div className={c.headerWrap}>
                    <h1>{props.headerName}</h1>
                </div>
                {props.back &&(
                <div className={c.backWrap}>
                    <NavLink to={'/functions'}>
                    <Button
                        variant="contained"
                        color="#ffffff"
                        className={classes.button}
                        startIcon={<AppsIcon />}
                    >
                        All functions
                    </Button>
                    </NavLink>
                </div>
                )}
            </div>

        </div>
    );
};

export default PageHeader;
