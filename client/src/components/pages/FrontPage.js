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
            isLoggedIn: true,  //auth ? true : false,
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
        let button = event.target.id
        if (button === "play") {
            this.setState({ signin: true, signup: false })
        } else if (button === "create") {

            this.setState({ signin: false, signup: true })
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