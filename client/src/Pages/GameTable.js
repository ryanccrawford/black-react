import React, { Component }from 'react';
import { Button, Paper } from '@material-ui/core/';
import Dealer from '../components/Dealer'
import Players from '../components/Players'
import Deck from '../Classes/Deck'

class GameTable extends Component {

    constructor(props) {
        super(props)

        this.setDeck = props.setDeck


        let player1 = {
            id: 1,
            name: "Ryan",
            isTurn: true,
            cards: []
        }

        this.state = {
            deckId: props.deckId,
            players: [],
            houseBank: {},
            whosTurn: 1,
            gameStarted: false,

        }
        this.state.dealer = {
            name: "Dealer",
            isTurn: false,
            cards: []
        }
        this.state.players.push(player1)
        this.deckReady = (deckId) => {
            console.log("deck is ready")
            console.log(deckId)
            this.setState({ deckId: deckId, gameStarted: true })
            this.gameLoop()

        }
        this.deck = new Deck(this.deckReady, this.setDeck, this.state.deckId.length > 0 ? this.state.deckId : "")

    }

    componentDidMount() {


    }
    clickPlayHandler = (event) => {

    }

    clickStartGameHandler = (event) => {
        console.log(this.state.players)
        console.log(this.state.dealer)
        console.log(this.state.deck)

        this.setState({ gameStarted: true, deckId: this.deck.deckId })

    }



    gameLoop = () => {
        console.log("Inside of the game loop")

    }

    setGameStarted = (didGameStart) => {
        this.setState({ gameStarted: true })
        if (this.state.deckId.length < 1) {
            this.deck.getNewDeckShuffle()
        } else {
            this.deck.shuffleThisDeck()
        }
    }

    play = (playerIndex) => {
        console.log("play button pressed")
        console.log(playerIndex)
        let numberOfPlayers = this.state.players.length
        let cardsDeltCount = 0
        while (cardsDeltCount < 2) {
            for (let i = 0; i < numberOfPlayers; i++) {
                
                this.deck.drawCard(this.drawCardCallback, i, 1)

            }
            cardsDeltCount++
        }
    }

    drawCardCallback = (cards, player) => {
        console.log("draw card call back")
    console.log(cards)
    let updatedPlayers = this.state.players
    updatedPlayers[player].cards.push(cards)
    this.setState({ players: updatedPlayers })
}

    firstDeal = () => {



    }



    render() {
        console.log("Game Started = " + this.state.gameStarted)


        return (
            <div>
                <Button
                    onClick={this.clickStartGameHandler}
                >
                    Start Game
                </Button>

                <Dealer
                    dealer={this.state.dealer}
                >
                </Dealer>
                <Players 
                    players={this.state.players}
                    playClick={this.play}
                ></Players>
                </div>
            )

    }


    }

export default GameTable;

