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
import Divider from "@material-ui/core/Divider"

const axios = require('axios');
const apiserver = "http://localhost:3001"

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
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

    doSuccess = (response) => {
        console.log("Inside Success")
        console.log(response)
        if (response.status === 200) {
            console.log(response.data)

            window.location.replace('/gamescreen');
        }
        else if (response.status > 200 && response.status < 500) {
            this.setState({ errors: { bad: response.data }, password: "" })
        }
    }

    doError = (err) => {

        this.setState({ errors: { bad: "Something isn't right try again" } })

    }




    render() {
        const { errors } = this.state;
        return (
            <Dialog
                open
                onRequestClose={this.props.toggleLogin}
                fullScreen={this.props.fullScreen}>
                <DialogTitle>Sign Up</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {errors.bad ? (<div>{errors.bad}</div>) : (null)}
                    </DialogContentText>
                    <DialogContentText>
                        Already have an account? <Link to="/signin">Log in</Link>
                    </DialogContentText>
                    <form noValidate onSubmit={this.onSubmit}>

                        <TextField
                            autoFocus
                            onChange={this.onChange}
                            value={this.state.name}
                            error={errors.password}
                            id="name"
                            type="text"
                            label={"Name"}
                            margin="dense"
                            required={true}
                            fullWidth
                        />

                        <TextField
                            
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
                       <Divider/>
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
                          
                        <TextField
                            
                            onChange={this.onChange}
                            value={this.state.password2}
                            error={errors.password2}
                            id="password2"
                            type="password"
                            label={"Confirm Password"}
                            margin="dense"
                            required={true}
                            fullWidth
                        />
                        

                    </form>
                   
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
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >Sign up
                            </Button>
                    </FormControl>

                </DialogActions>
            </Dialog>



        );
    }
}
export default Signup;