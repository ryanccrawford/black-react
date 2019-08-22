import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import Welcome from './Landing'
import GameScreen from './GameScreen'
const auth = localStorage.getItem('jwtToken');



class FrontPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activePage: "",
            isLoggedIn: false,  //auth ? true : false,
            auth: auth,
            signin: false,
            signup: false,

        }

    }

    getLandingPage = () => {
        return (
            <Welcome
                clickEventHandle={this.onClickEvent}
                signin={this.state.signin}
                signup={this.state.signup}
                auth={this.state.auth}
                isloggedin={this.state.isloggedin}
            />
        )
    }

    gotoGameScreen = () => {
        return (
            <div>
            <GameScreen />
            </div>
        )

    }

    onClickEvent = (event) => {
        let issignin = true
        let issignup = false
        let button = event.target
        button.disabled = true
        let bid = button.id
        if (bid === "play") {
            issignin = true
            issignup = false
        } this.setState({ signin: this.state.signin, signup: !this.state.signup }, () => button.disabled = false)
        if (bid === "create") {
            issignin = false
            issignup = true
            this.setState({ signin: !this.state.signin, signup: this.state.signup }, () => button.disabled = false)
        }

    }


    render() {

        return (
            <div>
                {this.state.isLoggedIn ? this.gotoGameScreen() : this.getLandingPage()}
            </div>

        )
    }

   }
export default FrontPage;