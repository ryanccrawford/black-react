import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TopBar from './components/TopBar';

import GameTable from './components/GameTable'




class App extends Component {


    state = {}
    constructor(props) {
        super(props)


    }



    render() {
        return (
            <div>
                <CssBaseline />
                <Container maxWidth="lg">
                    <TopBar>
                    </TopBar>
                    <Container>
                        <GameTable/>
                   </Container>
                </Container>
            </div>
        );
    }
}

export default App;
