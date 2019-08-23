import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import {
    withRouter
} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from "@material-ui/core/Divider"
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
const axios = require('axios');
const apiserver = process.env.PORT ? "" : "http://localhost:3001";




class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            token: '',
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {},
            isOpen: true,
            signedUp: false
        };
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        console.log(newUser);
        axios({
            method: "POST",
            //url: "/api/register",
            url: apiserver + "/api/register",
            data: newUser
        }).then(this.doSuccess).catch(this.doError)

    };

    doWait = () => {

        const useStyles = makeStyles(theme => ({
            progress: {
                margin: theme.spacing(2),
            },
        }));

        const classes = useStyles();
        return (
            <div>
                <CircularProgress className={classes.progress} color="secondary" />
            </div>
        );


    }

    doSuccess = (response) => {
        console.log("Inside Success")
        console.log(response)
        if (response.status === 200) {
            console.log(response.data)

            window.location.href(apiserver + "/signedup")
        }
        else if (response.status > 200 && response.status < 500) {
            this.setState({ errors: { bad: response.data }, password: "", isLoading: false })
        }
    }

    doError = (err) => {

        this.setState({ errors: { bad: "Some of the information you entered is not correct. Please check and try again." }, isLoading: false })

    }
    handleClose = () => {

        this.setState({ isOpen: false });
    }


    render() {
        const {
            isLoading,
            token,
            name,
            email,
            password,
            password2,
            errors,
            isOpen,
            signedUp
        } = this.state;


        if (!isOpen) {
            return (
                <Redirect to="/" />
            )

        }



        return (

                <Dialog
                open={true}
                    onRequestClose={this.handleClose}
            >
                    <DialogTitle>Sign Up</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            {errors.bad ? (<span>Errors: {errors.bad}</span>) : (null)}
                        </DialogContentText>


                        <DialogContentText>
                            Already have an account? <Link to="/signin">Log in</Link>
                        </DialogContentText>


                        <TextField
                            autoFocus
                            onChange={this.onChange}
                            value={name}
                            error={errors.name}
                            id="name"
                            type="text"
                            label={"Name"}
                            margin="dense"
                            fullWidth={true}
                        />

                        <TextField

                            onChange={this.onChange}
                            value={email}
                            error={errors.email}
                            id="email"
                            type="email"
                            label={"Email"}
                            margin="dense"
                            fullWidth={true}
                        />
                        <Divider />
                        <TextField

                            onChange={this.onChange}
                            value={password}
                            error={errors.password}
                            id="password"
                            type="password"
                            label={"Password"}
                            margin="dense"
                        />

                        <TextField

                            onChange={this.onChange}
                            value={password2}
                            error={errors.password2}
                            id="password2"
                            type="password"
                            label={"Confirm Password"}
                            margin="dense"

                        />
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
                                onClick={this.handleClose}
                            >Cancel
                        </Button>
                        </FormControl>
                        <FormControl>


                            <Button
                                variant="contained"
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                onClick={this.onSubmit}
                                type="submit"
                                color="primary"
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >Sign up
                            </Button>
                        </FormControl>
                    </DialogActions>

                </Dialog >

        )

    }
}
export default withRouter(Signup);