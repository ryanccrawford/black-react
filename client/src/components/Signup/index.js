import React, { Component } from "react";
import { Link } from "react-router-dom";
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
            url: "/api/register",
          //url: apiserver + "/api/register",
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
            <div className="container">
                {errors.bad ? (<div>{errors.bad}</div>) :(null) }
                <div className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to
                            home
            </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Register</b> below
              </h4>
                            <p className="grey-text text-darken-1">
                                Already have an account? <Link to="/login">Log in</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="name"
                                    type="text"
                                />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id="password2"
                                    type="password"
                                />
                                <label htmlFor="password2">Confirm Password</label>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                    Sign up
                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Signup;