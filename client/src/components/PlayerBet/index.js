import React from 'react';
import Chip from '../Chip';
import './style.css';

export default function PlayerBet(props) {
    console.log("inside Player Bet")
    console.log("Amount " + props.amount) 
    return (
       
        <div>
            <Chip
                data-playerIndex={props.playerIndex}
                data-amount={props.amount}
                amount={props.amount} />
            </div>
        )
}