import React, { Component } from 'react';



class FrontPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activePage: "",
            isLoggedIn: false,
            token: ""

        }

    }

    buttonOnClickEvent = (event) => {
        event.preventDefault();
        let button = event.target
        window.location.replace('/' + button.getAttribute('data-name'));

    }

    render() {
    return(
            <div>
            <button
                data-name={"signup"}
                onClick={this.buttonOnClickEvent}
            >Sign Up
                </button>
                <button
                    data-name={"signin"}
                    onClick={this.buttonOnClickEvent}
                >Sign In</button>
            </div>
                )
                }
                }


export default FrontPage;