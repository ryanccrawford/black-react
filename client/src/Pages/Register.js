import React, { Component } from 'react';
import { AppBar, Button, TextField, Container } from '@material-ui/core';
import Login from './Login'
import axios from 'axios';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            money: 10000.00,
        }
    }

    handleClick(event) {
        const apiBaseUrl = "/api/players";
        console.log("values", this.state.name, this.state.money, this.state.email, this.state.password);
        //To be done:check for empty values before hitting submit
        const self = this;
        const payload = {
            "name": this.state.first_name,
            "email": this.state.email,
            "password": this.state.password,
            "money": this.state.money
        }
        axios.post(apiBaseUrl + '/register', payload)
            .then(function (response) {
                console.log(response);
                if (response.data.code == 200) {
                    //  console.log("registration successfull");
                    let loginscreen = [];
                    loginscreen.push(<Login parentContext={this} />);
                    let loginmessage = "Not Registered yet.Go to registration";
                    self.props.parentContext.setState({
                        loginscreen: loginscreen,
                        loginmessage: loginmessage,
                        buttonLabel: "Register",
                        isLogin: true
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <Container>
                    <div>
                        <AppBar
                            title="Register"
                        />
                        <TextField
                            hintText="Enter Name (Everyone will see this)"
                            floatingLabelText="Name"
                            onChange={(event, newValue) => this.setState({ name: newValue })}
                        />
                        <br />
                        <TextField
                            hintText="Enter your Email"
                            type="email"
                            floatingLabelText="Email"
                            onChange={(event, newValue) => this.setState({ email: newValue })}
                        />
                        <br />
                        <TextField
                            type="password"
                            hintText="Enter a Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({ password: newValue })}
                        />
                        <br />
                        <Button label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
                    </div>
                </Container>
            </div>
        );
    }
}
const style = {
    margin: 15,
};
export default Register;