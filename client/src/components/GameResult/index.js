import React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './style.css';




export default function GameResult(props) {
    const messageImage = {
        "win": "/images/message/win21.png",
        "busted": "/images/message/busted.png"
    }
    const imgMessage = messageImage[props.type]

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
            props.isOpen ? (
                <div>
                    <Dialog
                        open={handleOpen}
                        onClose={handleClose}
                    >

                        <DialogTitle id="simple-modal-title">{props.title}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="simple-modal-description">
                                <img src={imgMessage} height={"100%"} alt=".." />
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <FormControl>
                                <Button
                                    variant="contained"
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    color="primary"
                                    onClick={handleClose}
                                >OK
                        </Button>
                            </FormControl>
                        </DialogActions>
                    </Dialog>
                </div>
            ) : (null))

}

