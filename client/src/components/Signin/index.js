import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions'; 
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
    

const axios = require('axios');
const apiserver = "http://localhost:3001";



class Signin extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        axios({
            method: "POST",
            //url: "/api/login",
            url: apiserver + "/api/login",
            data: userData
        }).then(this.doSuccess).catch(this.doError)

    };

    doSuccess = (response) => {
        console.log("Inside Success")
        console.log(response)
        if (response.status === 200) {
            console.log(response.data)
            window.location.replace('/gamescreen');
        }
        else if (response.status > 200 && response.status < 500) {
            this.setState({ errors: { bad: response.data }, password: ""})
        }
    }

    doError = (err) => {

        this.setState({ errors: { bad: "Wrong Email or Password Combination"} })

    }

    render() {
        const { errors } = this.state;
        return (
            <Dialog
                open
                onRequestClose={this.props.toggleLogin}
                fullScreen={this.props.fullScreen}>
                <DialogTitle>Sign In</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {errors.bad ? (<div>{errors.bad}</div>) : (null)}
                    </DialogContentText>
                    <form noValidate onSubmit={this.onSubmit}>
                      
                            <TextField
                                autoFocus
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                                type="email"
                                label={"Email"}
                                margin="dense"
                            required={true}
                            fullWidth
                            />
                
                            <TextField
                                onChange={this.onChange}
                                value={this.state.password}
                                error={errors.password}
                                id="password"
                                type="password"
                                label={"Password"}
                                margin="dense"
                            required={true}
                            fullWidth
                            />
                  
                        
                    </form>
                    <DialogContentText>
                        Don't have an account? <Link to="/signup">Sign Up</Link>
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
                            onClick={this.props.toggleLogin}
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
                            type="submit"
                            color="primary"
                        >Sign In
                                </Button>
                    </FormControl>
                   
                </DialogActions>
            </Dialog>
        );
    }
}

export default Signin;