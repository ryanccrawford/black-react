import React from 'react';
import Chip from '../Chip';
import './style.css';

export default function PlayerBet(props) {
    console.log("inside Player Bet")
    console.log("Amount " + props.amount)
    let newch = []
    let ch = getChipsFor(props.amount)
    ch.forEach((item, index) => {

        for (let i = 0; i < item.count; i++) {
            newch.push(item.chip)
        }

    })
    return (

        <div>
            {newch.map((results, index) => {

               return (
                    <Chip
                    data-playerIndex={index}
                        data-amount={results}
                        amount={results}
                    />
                )

            })
            }
        </div>
    )
}




function getChips(amount, chips, chipDenomonations, counter) {
    if (counter < 0) {
        return chips
    }
    let numberOfThis = amount / (chipDenomonations[counter])
    if (numberOfThis > 0) {
        amount = amount % (chipDenomonations[counter])
        let y = { chip: chipDenomonations[counter], count: parseInt(numberOfThis) }
        chips.push(y)
    }
    counter--
    return getChips(amount, chips, chipDenomonations, counter)

}

function getChipsFor(amount) {
    let chipDenomonations = [5, 10, 25, 50, 100, 500, 1000, 5000, 10000]
    let chips = []
    let counter = chipDenomonations.length - 1
    getChips(amount, chips, chipDenomonations, counter)
    return chips
}