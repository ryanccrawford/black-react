import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PlayerActions from '../PlayerActions';
import PlayerBet from '../PlayerBet';
import GamePlay from '../GamePlay';
import Player from '../Player';
import PlayerHand from '../PlayerHand';
import DealerHand from '../DealerHand';
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

        if (playerindex === 0 && this.state.round === 0) {
            this.setState({ round: this.state.round + 1 })
            this.GamePlay.dealOutCards(this.cardsDelt)

        } else if (playerindex !== 0 && this.state.round === 0 && this.GamePlay.Players[playerindex].bets.length < 1) {
            console.log("Player is not the dealer and its first betting round and no bets have been made. ")
            this.GamePlay.Players[playerindex].canBet = true;
            console.log("we just set the player canBet to True")
            this.setState({ playerTurnIndex: playerindex})

        } else if (playerindex !== 0 && this.state.round === 1) {
            this.GamePlay.Players[playerindex].setIsTurn("play")
            this.GamePlay.Players[this.state.playerTurnIndex - 1].unsetIsTurn()
            this.setState({ playerTurnIndex: playerindex })
        }

    }
    //Handles the button click events for game play
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
                            console.log("Rendering game Table")
                            console.log(player)
                            if (index === 0) {
                                return (

                                    <Grid item xs={12}>
                                      <h2 className="white">Dealer</h2>

                                        {this.state.cardsDelt ? (

                                            <div className="hand">
                                                <DealerHand
                                                    key={"dealer"}
                                                    playerPosition={(this.GamePlay.Players.length + 1)}
                                                    isPlayerTurn={"test"}
                                                    cards={player.cards}
                                                    gamePlay={this.GamePlay} />

                                            </div>

                                        ) : (<div className="hand"></div>)}

                                        </Grid>


                                )

                            } else
                            {

                                return (
                                    <div>
                                        <Grid key={"grid" + player.name} item xs={6}>
                                     <h2 className="white">Player {player.name}</h2>
                                            {this.state.cardsDelt ? (
                                                <div className="hand">
                                                <PlayerHand
                                                    key={player.name}
                                                    playerPosition={index}
                                                    isPlayerTurn={player.isTurn}
                                                    cards={player.cards}
                                                    gamePlay={this.GamePlay}
                                                />
                                                </div>
                                            ) : (<div className="hand"></div>)
                                                }

                                    </Grid>
                                    <Grid item xs={6}>
                                       <h3>Bets</h3>
                                         <div className="betbox">
                                        {this.state.playersBets.map((bet, betindex) => {
                                                if (bet.playerIndex === index) {
                                                    return (
                                                        <div>

                                                        <PlayerBet
                                                            key={betindex + bet.playerIndex}
                                                            playerIndex={bet.playerIndex}
                                                            amount={bet.amount}

                                                            />
                                                        </div>

                                                    )
                                                } else {return <div></div>}
                                            })}
                                         </div>
                                            <h3>Actions</h3>
                                            <ToastContainer/>
                                         <div className="actionbox">
                                                <PlayerActions
                                                    key={index}
                                                    amount={this.GamePlay.Players[index].lastBet || 5}
                                                    player={player}
                                                    gamePlay={this.GamePlay}
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
