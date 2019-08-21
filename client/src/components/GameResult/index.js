import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import SimpleModal from '@material-ui/core/Modal';
import './style.css';


const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 4),
    },
}));
    
export default function GameResult(props) {
    const messageImage = {
        "win": "./images/gui/balance_bet.png",
        "busted": "./images/gui/busted.png"
    }
    const imgMessage = messageImage[props.type]
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    if (props.isOpen) {
        handleOpen()
    } else {
        handleClose()
    }

    return (
        <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div className={classes.paper}>
                    <h2 id="simple-modal-title">{props.title}</h2>
                    <p id="simple-modal-description">
                        <img src={imgMessage} alt=".."/>
                     </p>
                    <GameResult />
                </div>
            </Modal>
        </div>
    );
}