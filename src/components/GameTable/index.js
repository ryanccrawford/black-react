import React, { Component } from 'react';
import GamePlay from '../GamePlay';
import Player from '../Player'
import PlayerHand from '../PlayerHand';
import DealerHand from '../DealerHand'
import './style.css';

class GameTable extends Component {


    constructor(props) {
        super(props)
        this.state = {
            cardsDelt: false
        }

        const options = {}
        let numOfPlayers = 1
        let player1 = new Player("Ryan", "player", 10000)
        let player2 = new Player("Other", "player", 10000)
        options.Players = []
        options.Players.push(player1)
        options.Players.push(player2)
        this.GamePlay = new GamePlay(options)
    }

    componentDidMount() {
        this.GamePlay.startGame()
        this.GamePlay.dealOutCards(this.cardsDelt)
    }
    cardsDelt = () => {

        this.setState({ cardsDelt: true })

    }

    render() {
        return (
            <div className={"game-table"}>
                <div className={"box"}>
                    {this.state.cardsDelt ? this.GamePlay.Players.map((player, index) => {
                        if (index === 0) {
                            return (
                                <div className="hand">
                                    <h2>Dealer</h2>
                                <DealerHand
                                    key={player.name}
                                    isPlayerTurn={"test"}
                                    cards={player.cards}
                                    gamePlay={this.GamePlay} />
                                </div>
                            )

                                }
                        return (
                            <div className="hand">
                                <h2>Player {player.name}</h2>
                            <PlayerHand
                                key={player.name}
                                isPlayerTurn={"test"}
                                cards={player.cards}
                                gamePlay={this.GamePlay}
                                />
                            </div>
                        )
                    }) : null

                    }
                </div>
            </div>
        );
    }

}

export default GameTable