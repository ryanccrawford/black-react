import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PlayerActions from '../PlayerActions'
import PlayerBet from '../PlayerBet'
import GamePlay from '../GamePlay';
import Player from '../Player'
import PlayerHand from '../PlayerHand';
import DealerHand from '../DealerHand'
import { ToastContainer, toast  } from 'react-toastify';
import './style.css';



class GameTable extends Component {


    constructor(props) {
        super(props)
        this.state = {
            cardsDelt: false,
            playersBets: [],
            playerTurnIndex: 1,
            round: 0

        }

        const options = {}
        let player1 = new Player("Ryan", "player", 10000)
        let player2 = new Player("Other", "player", 10000)
        options.Players = []
        options.Players.push(player1)
        options.Players.push(player2)
        this.GamePlay = new GamePlay(options)

    }

    notify = (message) => {
        toast(message)
    };

    componentDidMount() {
        console.log("Component Mounted")
        this.GamePlay.startGame()
        this.setPlayersTurn(1)

    }

    placeBet = (playerIndex, amount = 5, isBuyIn = false) => {

        if (isBuyIn) {
            this.GamePlay.dealOutCards(this.cardsDelt)
        }
    }

    cardsDelt = () => {


        this.setState({ cardsDelt: true })
        //steps to check game outcome
        //1 check to see if anyone has 21
        //if so check to see if dealer has 21 if so
        //close game and return all bets. IF not payout players with
        //21 2:1 and all players who don't house keeps there money

    }


    setPlayersTurn = (playerindex) => {
        console.log("Inside Set Player turn Player number " + playerindex)
        this.GamePlay.Players.forEach(player => {
            player.canBet = 0
        })
        if (playerindex === 0 && this.state.round === 0) {
            this.setState({ round: this.state.round + 1 })
            this.GamePlay.dealOutCards(this.cardsDelt)

        } else {
            this.GamePlay.Players[playerindex].setIsTurn("bet")
            this.GamePlay.Players[this.state.playerTurnIndex - 1].unsetIsTurn()
            this.setState({ playerTurnIndex: playerindex })
        }

    }

    actionClick = (event) => {
        console.log(event)
        console.log(event.target)
        const name = event.target.getAttribute("data-name");
        console.log(name)
        const playerIndex = event.target.getAttribute("data-player-index");
        const amount = event.target.value;
        console.log(playerIndex)
        if (name && playerIndex) {
           
           
            this.GamePlay.placeBet(playerIndex, amount, this.betCallBack)
           
        }

    }

    betCallBack = (playerIndex, amount) => {
        let bankLeft = this.GamePlay.Players[playerIndex].bankRoll
        this.notify("You Bet $" + amount + ". You have $" + bankLeft)
        let newPlayerBets = { playerIndex: playerIndex, amount: amount }
        this.setPlayersTurn(this.GamePlay.getNextPlayer());
        this.setState({ playersBets: [...this.state.playersBets, newPlayerBets] })
    }



    render() {
        return (

            <div className={"game-table"}>

                <div className={"box"}>
                    <Grid container spacing={2}>
                        {this.GamePlay.Players.map((player, index) => {
                            if (index === 0) {
                                return (

                                    <Grid item xs={12}>
                                      <h2 className="white">Dealer</h2>
                                        <div className="hand">
                                        {this.state.cardsDelt ? (


                                                <DealerHand
                                                    key={"dealer"}
                                                    playerPosition={(this.GamePlay.Players.length + 1)}
                                                    isPlayerTurn={"test"}
                                                    cards={player.cards}
                                                    gamePlay={this.GamePlay} />



                                                ) : (null)}
                                            </div>
                                        </Grid>


                                )

                            } else
                            {

                                return (
                                    <div>
                                    <Grid item xs={6}>
                                     <h2 className="white">Player {player.name}</h2>
                                            <div className="hand">
                                            {this.state.cardsDelt ? (
                                                <PlayerHand
                                                    key={player.name}
                                                    playerPosition={index}
                                                    isPlayerTurn={player.isTurn}
                                                    cards={player.cards}
                                                    gamePlay={this.GamePlay}
                                                />

                                        ) : (null)
                                                }
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                       <h3>Bets</h3>
                                         <div className="betbox">
                                        {this.state.playersBets.map((bet, betindex) => {
                                                if (bet.playerIndex === index) {
                                                    return (
                                                        <div>

                                                        <PlayerBet
                                                            key={betindex}
                                                            playerIndex={bet.playerIndex}
                                                            amount={bet.amount}

                                                            />
                                                        </div>

                                                    )
                                                } else { return null }
                                            })}
                                         </div>
                                            <h3>Actions</h3>
                                            <ToastContainer/>
                                         <div className="actionbox">
                                                <PlayerActions
                                                    amount={player.lastBet || 5}
                                                    bet={player.canBet}
                                                    stay={player.canStay}
                                                    hit={player.canHit}
                                                    double={player.canDouble}
                                                    split={player.canSplit}
                                                    player={index}
                                                    playerIndex={index}
                                                    actionClick={this.actionClick}
                                           />
                                         </div>
                                    </Grid>
                                    </div>

                                )
                            }
                        }

                        )
                        }
                    </Grid>

                </div>


            </div>
        );
    }

}

export default GameTable
