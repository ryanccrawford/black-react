import React from 'react';
import Chip from '../Chip';
import './style.css';

export default function PlayerBet(props) {

    return (

            <div>
            <Chip
                data-playerIndex={props.playerIndex}
                data-amount={props.amount}
                amount={props.amount} />
            </div>
        )
}