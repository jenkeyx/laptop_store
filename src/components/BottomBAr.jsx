import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import {AppBar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    buttons: {
        display: "flex",
        flexWrap: "nowrap",
        flexFlow: "row",
        flex: "auto",
        width: '100vw'
    }
}));

export default function (props) {
    const classes = useStyles();

    return <AppBar position="fixed" color="#f8f8f8" className={classes.appBar}>
        <Toolbar>
            <div className={classes.buttons}>
                <Typography variant="h4" gutterBottom>
                    ЦЕНА: {props.price}₽
                </Typography>
            </div>
        </Toolbar>
    </AppBar>
}

