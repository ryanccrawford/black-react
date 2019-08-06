import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import PlayerHand from './components/PlayerHand';
import TopBar from './components/TopBar';
import GamePlay from './components/GamePlay';
import Player from './components/Player'
import Deck from './components/Deck'



class App extends Component {

    
    state = {}
    constructor(props) {
        super(props)
        const options = {}
        let player = new Player("Ryan", "player", 10000)
        options.Players = []
        options.Players.push(player)
        this.game = new GamePlay(options)
        this.state.cards = []
        

    }

    componentDidMount() {
        this.game.startGame()
        this.game.dealOutCards(this.cardsDelt)
        

    }
    cardsDelt = () => {
        console.log(this.game.Players[1].cards)
        this.setState({ cards: [...this.state.cards, ...this.game.Players[1].cards] })
    }

    render() {
        return (
            <div>
                <CssBaseline />
                <Container maxWidth="lg">
                    <TopBar>
                    </TopBar>
                    <Container>
                        {console.log("cards")}
                        {console.log(this.state.cards)}
                        <PlayerHand cards={this.state.cards} />

                    </Container>
                </Container>
            </div>
        );
    }
}

export default App;
