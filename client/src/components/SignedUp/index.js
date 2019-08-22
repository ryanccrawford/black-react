import React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function SignedUp(props) {



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

                    <DialogTitle id="simple-modal-title">Thank You!</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="simple-modal-description">
                            <p>Thank you for signing up. Your account has been created. To return to the login page click, OK and then on 'Play Now!'</p>
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

