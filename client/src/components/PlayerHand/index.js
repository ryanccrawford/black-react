import React, { Component } from 'react';
import PlayCard from '../PlayCard';
import './style.css';

class PlayerHand extends Component {

    state = {
        cards: []
    }
    constructor(props) {
        super(props)
        console.log(props.cards)
        this.state.cards = props.cards
        this.state.playerPosition = props.playerPosition
        this.state.round = props.round
    }



   render() {

        return (
            <div className="row player">
                <div className="col">

                {console.log("cards")}
                {console.log(this.state.cards)}

                {this.state.cards.map((card, index) => {
                    return (


                        <PlayCard
                            key={index}
                           
                            counter={(this.state.round < 2) ?  (((index + 1) * ((parseInt(this.state.playerPosition) * 500) * parseInt(this.state.playerPosition)))) : (500)}
                            owner={card.owner}
                            rank={card.value}
                            suit={card.suit}
                            hidden={card.facedown}
                            ></PlayCard>

                    )
                })}
                    </div>
           </div>
        );
    }



}

export default PlayerHand;
