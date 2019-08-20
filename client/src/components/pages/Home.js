import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import FrontPage from "./FrontPage";
import GameScreen from "./GameScreen";
import Signup from "../Signup";
import Signin from "../Signin";
const auth = localStorage.getItem('jwtToken');


class Home extends Component {
    render() {
        return (
            <Router>
                <div>
                    <CssBaseline />
                    <Container fixed>
                        <Route exact path="/" component={FrontPage} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/signin" component={Signin} />
                        {auth ? (
                            <Route exact path="/gamescreen" component={GameScreen} />) : (null)}
                    </Container>
                    
                      
                </div>
                <div className="footer" style={{ backgroundColor: "black", height: "75px" }}></div>

            </Router>
        );
    }
}
export default Home;