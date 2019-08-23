import React from 'react';
import { Link, Redirect } from "react-router-dom";
import {
    withRouter
} from 'react-router-dom'
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

            <div>
                <Dialog
                    open={handleOpen}
                    onClose={handleClose}
                >

                    <DialogTitle>Thank You!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                          Thank you for signing up. Your account has been created. To return to the login page click, OK and then on 'Play Now!'
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>

                            <Button
                            variant="contained"
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            color="primary"
                            onClick={() => { return (<Redirect to="/"/>)}}
                            >OK
                        </Button>

                    </DialogActions>
                </Dialog>
            </div>
        )

}

