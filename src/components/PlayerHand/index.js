import React, { Component } from 'react';
import PlayCard from '../PlayCard';
import Delay from 'react-delay'
import './style.css';

class PlayerHand extends Component {

    state = {
        cards: []
    }
    constructor(props) {
        super(props)
        console.log(props.cards)
        this.state.cards = props.cards


    }

   render() {

        return (
            <div className="row player">
                <div className="col">

                {console.log("cards")}
                {console.log(this.state.cards)}

                {this.state.cards.map((card, index) => {
                    return (

                        <Delay
                            wait={2000}
                        >
                        <PlayCard
                            key={index}
                            owner={card.owner}
                            rank={card.value}
                            suit={card.suit}
                            hidden={card.facedown}
                            ></PlayCard>
                        </Delay>
                    )
                })}
                    </div>
           </div>
        );
    }



}

export default PlayerHand;
