import React, { Component } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


//<FontAwesomeIcon icon="check-square" />

export default function PlayerActions(props) {

    const classes = makeStyles(theme => ({
        button: {
            margin: theme.spacing(4),
        },
        leftIcon: {
            marginRight: theme.spacing(4),
        },
        rightIcon: {
            marginLeft: theme.spacing(4),
        },
        iconSmall: {
            fontSize: 20,
        },
    }));

    
        return (
            <div>
                <div variant="contained"
                    color="inherit"
                    size="large"
                    aria-label="large contained primary button group"
                >
                    <button
                            disabled={!props.bet}
                            data-name={"bet"}
                            data-player-index={props.playerIndex}
                            variant="contained"
                            color="dark"
                            className={classes.button}
                        onClick={!props.bet ? null : props.actionClick}
                        >
                        BET
                    <FontAwesomeIcon className={classes.rightIcon} icon="coins" />
                    </button>
       
                    <button
                        disabled={!props.hit }
                            data-name={"hit"}
                            data-player-index={props.playerIndex}
                            variant="contained"
                            color="dark"
                            className={classes.button}
                        onClick={!props.hit ? null : props.actionClick}
                        >
                    HIT
                    <FontAwesomeIcon className={classes.rightIcon} icon="hand-point-up" />
                </button>
                    <button
                        disabled={!props.stay}
                        data-name={"stay"}
                        data-player-index={props.playerIndex}
                        variant="contained"
                        color="dark"
                        className={classes.button}
                        onClick={!props.stay ? null : props.actionClick}
                    >
                STAY
                    <FontAwesomeIcon className={classes.rightIcon} icon="hand-paper" />
            </button>
                    <button
                        disabled={!props.double}
                            data-name={"double"}
                            data-player-index={props.playerIndex}
                            variant="contained"
                            color="dark"
                            className={classes.button}
                        onClick={!props.double ? null : props.actionClick}
                        >
                DOUBLE DOWN
                    <FontAwesomeIcon className={classes.rightIcon} icon="hand-point-up" />
            </button>
                    <button
                        disabled={!props.split}
                            data-name={"split"}
                            data-player-index={props.playerIndex}
                            variant="contained"
                            color="dark"
                            className={classes.button}
                        onClick={!props.split ? null : props.actionClick}
                        >
                    SPLIT
                    <FontAwesomeIcon className={classes.rightIcon} icon="hand-point-up" />
                        </button>
                    </div>
            </div>
            )
    }