import React from 'react';
import './style.css';

export default function BankDisplay(props) {
    const bankDisplay = "./images/gui/balance_bet.png"
    const nameDisplay = "./images/gui/name_plate.png"
    let bank = "$ " + props.bank 
    let bet = "$ " + props.bet
    return (

        <div className="score-block">
        <div className="name-display">
            <img
                className="name-plate"
                src={nameDisplay}
                alt="..."
            />
            <div className="name-text text-style">{props.name}</div>
        </div>
        <div className="bank-display">
            <img
                className="bank-plate"
                src={bankDisplay}
                alt="..."
            />
                <div className="money text-style">{bank}</div>
            <div className="bet text-style">{bet}</div>
            </div>
         </div>
    )
}