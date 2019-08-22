import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import FrontPage from "./FrontPage";
import GameScreen from "./GameScreen";
import Signup from "../Signup";
import Signin from "../Signin";
import Landing from "./Landing";
import SignedUp from "../SignedUp"
const auth = null;


export default function Home()   {

        return (
            <Router>
                <div>
                    <CssBaseline />
                    <Container fixed>
                        <Route exact path="/" component={FrontPage} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/signin" component={Signin} />
                        <Route exact path="/gamescreen" component={GameScreen} />
                        <Route exact path="/signedup" component={SignedUp} />
                    </Container>


                </div>


            </Router>
        );

}

