import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import PlayerActions from '../PlayerActions'
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
        let numOfPlayers = 2
        let player1 = new Player("Ryan", "player", 10000)
        let player2 = new Player("Other", "player", 10000)
        options.Players = []
        options.Players.push(player1)
        options.Players.push(player2)
        this.GamePlay = new GamePlay(options)
        this.state.playerTurnIndex = 0
    }

    componentDidMount() {
        this.GamePlay.startGame()
        this.setFirstPlayersTurn()
    }

    placeBet = (playerIndex, amount, isBuyIn = false) => {

        if (isBuyIn) {
            this.GamePlay.dealOutCards(this.cardsDelt)
        }
    }

    cardsDelt = () => {

        this.setState({ cardsDelt: true })
        this.setFirstPlayersTurn()

    }

    setFirstPlayersTurn = () => {
        console.log(this.GamePlay.Players[1])
        this.GamePlay.Players[1].setIsTurn()
        this.GamePlay.Players[1].canBet = true
        this.GamePlay.Players[1].canHit = false
        this.GamePlay.Players[1].canStay = false
        
        this.setState({ playerTurnIndex: 1})

    }

    actionClick = (event) => {
        console.log(event.target)
        if(event.target)

    }

    render() {
        return (

            <div className={"game-table"}>

                <div className={"box"}>
                    <Grid container spacing={12}>
                    {this.state.cardsDelt ? this.GamePlay.Players.map((player, index) => {
                        if (index === 0) {
                            return (
                            <Grid item xs={12}>
                                <div className="hand">
                                 <h2 className="white">Dealer</h2>
                                <DealerHand
                                    key={player.name}
                                    playerPosition={(this.GamePlay.Players.length + 1)}
                                    isPlayerTurn={"test"}
                                    cards={player.cards}
                                    gamePlay={this.GamePlay} />


                                 </div>
                               </Grid>
                            )

                                }
                        return (
                            <Grid item xs={12}>
                            <div className="hand">
                                <h2 className="white">Player {player.name}</h2>
                            <PlayerHand
                                    key={player.name}
                                    playerPosition={index}
                                    isPlayerTurn={player.isTurn}
                                    cards={player.cards}
                                    gamePlay={this.GamePlay}
                                />
                                </div>
                                {player.isTurn ? (
                                    <PlayerActions
                                        bet={player.canBet}
                                        stay={player.canStay}
                                        hit={player.canHit}
                                        double={player.canDouble}
                                        split={player.canSplit}
                                        player={index}
                                        actionClick={this.actionClick}
                                    />) : (null)}
                             </Grid>
                        )
                    }) : null

                        }
                    </Grid>
                    </div>

                </div>

        );
    }

}

export default GameTable