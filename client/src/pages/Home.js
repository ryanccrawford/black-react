import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TopBar from '../components/TopBar';
//import FrontPage from "./FrontPage";
import GameScreen from "./GameScreen";
//import Signup from "../components/Signup";
//import Signin from "../components/Signin";



class Home extends Component {
    render() {
        return (
            <Router>
                <div>
                    <CssBaseline />
                    <Container maxWidth="lg">
                        <TopBar>
                        </TopBar>
                        <Route exact path="/" component={GameScreen} />
                        {/* <Route exact path="/" component={FrontPage} />
                         <Route exact path="/register" component={Signup} />
                        <Route exact path="/login" component={Signin} />
                         
                         */}
                        
                    </Container>
                </div>
            </Router>
        );
    }
}
export default Home;