import React from 'react';
import './style.css';

export default function Chip(props) {
    console.log("inside Chip")
    const path = "./images/chips/"
    const chips = {
        "5": "5.png",
        "10": "10.png",
        "25": "25.png",
        "50": "50.png",
        "100": "100.png",
        "500": "500.png",
        "1000": "1000.png",
        "5000": "5000.png",
        "10000": "10000.png",
    }
    const chipPath = path + chips[props.amount.toString()]
    return (
        <div className={"player-" + props.playerIndex + " chip animate-chip"}>
            <img
                className={"chip-image"}
                src={chipPath}
                alt={"..."}
        />
        </div>
            )
}



