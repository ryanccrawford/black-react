import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import Welcome from './Landing'
const auth = localStorage.getItem('jwtToken');



class FrontPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activePage: "",
            isLoggedIn: auth ? true : false,
            auth: auth

        }

    }

    getLandingPage = () => {
        return (
            <Welcome />
        )
    }

    gotoGameScreen = () => {


    }


    buttonOnClickEvent = (event) => {
        event.preventDefault();
        let button = event.target
        window.location.replace('/' + button.getAttribute('data-name'));
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