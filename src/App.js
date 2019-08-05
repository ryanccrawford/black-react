import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import PlayerHand from './components/PlayerHand';
import TopBar from './components/TopBar';
import GamePlay from './components/GamePlay';
import Player from '../Player'


class App extends Component {

    
    state = {}
    constructor(props) {
        super(props)
        let player = new Player()
        this.game = new GamePlay()
    }



    render() {
        return (
            <div>
                <CssBaseline />
                <Container maxWidth="lg">
                    <TopBar>
                    </TopBar>
                    <Container>

                        <PlayerHand cards={this.state.cards} />

                    </Container>
                </Container>
            </div>
        );
    }
}

export default App;
