import React, { Component } from "react";
import { render } from "react-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Alert from "../components/Alert"
import LoginRegister, {
    PROVIDER_FACEBOOK
} from "react-mui-login-register";
import PlayerHome from "./PlayerHome";

class LoginScreen extends Component {

    state = {
        results: [],
        disableLocal: false,
        disableRegister: false
    };

    render() {
        return (
            <div>
                <LoginRegister
                    onLogin={this.handleLogin}
                    onRegister={this.handleRegister}
                    disableLocal={this.state.disableLocal}
                    disableRegister={this.state.disableRegister}
                />

                {this.state.results.map(r => (
                    <Alert key={r} message={r} />
                ))}

               
            </div>
        );
    }

    handleLogin = content => {
        this.addResult((<PlayerHome></PlayerHome>));
    };
    handleRegister = content => {
        this.addResult(`Registering with ${JSON.stringify(content)}`);
    };
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    addResult = msg => {
        this.setState(prevState => {
            return {
                results: [...prevState.results, msg]
            };
        });
    };
}

export default LoginScreen