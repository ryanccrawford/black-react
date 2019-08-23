import React from 'react';
import ReactDOM from 'react-dom';
import { useAlert } from 'react-alert'
const alert = useAlert()
 function GameMessage(props) {

    const location = props.location || null//top, bottom, player-#, dealer, center-screen
    const message = props.message // string message
    const type = props.type || "pop-over" // pop-over, modal, alert, prompt, to-player, from-player, sizzle
    const color = props.color || "#BBBBBB"
    const okClick = props.okClick || null // ok click cb function
    const noClick = props.noClick || null// no click cb function
    const title = props.title || "Game Information"

    return (


            <button
                onClick={() => {
                    alert.show('Oh look, an alert!')
                }}
            >
                Show Alert
            </button>


    )

}

export default GameMessage