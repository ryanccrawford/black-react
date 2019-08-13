import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TopBar from '../TopBar';
import FrontPage from "./FrontPage";
import GameScreen from "./GameScreen";
import Signup from "../Signup";
import Signin from "../Signin";



class Home extends Component {
    render() {
        return (
            <Router>
                <div>
                    <CssBaseline />
                    <Container maxWidth="lg">
                        <TopBar>
                        </TopBar>
                        <Route exact path="/" component={FrontPage} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/signin" component={Signin} />
                        <Route exact path="/gamescreen" component={GameScreen} />
                    </Container>
                </div>
            </Router>
        );
    }
}
export default Home;