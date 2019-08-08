import React, { Component } from 'react';
import clsx from 'clsx';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


//<FontAwesomeIcon icon="check-square" />

class PlayerActions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            player: props.player,
            bet: props.bet,
            hit: props.hit,
            stay: props.stay,
            double: props.double,
            split: props.split,
            actionClick: props.actionClick
        }

    }

    render() {
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
                <ButtonGroup variant="contained"
                    color="dark"
                    size="large"
                    aria-label="large contained primary button group"
                >
            {this.state.bet ? (
                        <Button
                            name={"bet"}
                            variant="contained"
                            color="dark"
                            className={classes.button}
                            onclick={this.state.actionClick}
                        >
                        BET
                    <FontAwesomeIcon className={classes.rightIcon} icon="coins" />
                    </Button>) : (null)}
       {this.state.hit ? (
                        <Button
                            variant="contained"
                            color="dark"
                            className={classes.button}
                            onclick={this.state.actionClick}
                        >
                    HIT
                    <FontAwesomeIcon className={classes.rightIcon} icon="hand-point-up" />
                </Button>) : (null)}
                    {this.state.stay ? (<Button
                        variant="contained"
                        color="dark"
                        className={classes.button}
                        onclick={this.state.actionClick}
                    >
                STAY
                    <FontAwesomeIcon className={classes.rightIcon} icon="hand-paper" />
            </Button>): (null)  }
        {this.state.double ? (
                        <Button
                            variant="contained"
                            color="dark"
                            className={classes.button}
                            onclick={this.state.actionClick}
                        >
                DOUBLE DOWN
                    <FontAwesomeIcon className={classes.rightIcon} icon="hand-point-up" />
            </Button>) : (null)}
        {this.state.split ? (
                        <Button
                            variant="contained"
                            color="dark"
                            className={classes.button}
                            onclick={this.state.actionClick}
                        >
                    SPLIT
                    <FontAwesomeIcon className={classes.rightIcon} icon="hand-point-up" />
                        </Button>) : (null)}
                    </ButtonGroup>
            </div>
            )
    }


}

export default PlayerActions