import React, { Component } from "react";
import { Button } from "@material-ui/core"
import Player from '../Player'

class Players extends Component {

    constructor(props) {
        super(props)
        console.log("Players")
        console.log(props)
        this.state = {
            players: props.players,
            playClickHandeler: props.playClick
        };
    }
    render() {
        return (
            <div>
                {this.state.players.map((player, index) => { 
                    return (
                        <div>
                        <Player
                            key={index}
                            name={player.name}
                            cards={player.cards}
                        >
                            </Player>
                            {player.isTurn ? (
                                <Button
                                    value={player.index}
                                    onClick={this.state.playClickHandeler(player.index)}
                                >Play</Button>

                            ) : (
                              <Button
                                 disabled={true}
                            >Play</Button>)}
                           
                            </div>
                        )
                })}
            </div>
         )
    }
}

export default Players