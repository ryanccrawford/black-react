import React, { Component } from "react";
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
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
            <Container maxWidth="sm">
                {errors.bad ? (<div>{errors.bad}</div>) : (null)}
                    <Paper>
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to
                            home
                        </Link>
                            <Typography variant="h4" >
                             Login
                            </Typography>
                            <Typography>
                                Don't have an account? <Link to="/register">Register</Link>
                            </Typography>
                        <form noValidate onSubmit={this.onSubmit}>
                        <FormControl>
                            <TextField
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    label={"Email"}
                                    variant={"outlined"}
                                    required={true}
                                />
                        </FormControl>
                        <FormControl>
                            <TextField
                                onChange={this.onChange}
                                value={this.state.password}
                                error={errors.password}
                                id="password"
                                type="password"
                                label={"Password"}
                                variant={"outlined"}
                                required={true}
                            />
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
                                >Login
                                </Button>
                        </FormControl>
                        </form>
                    </Paper>
                
            </Container>
        );
    }
}
export default Signin;