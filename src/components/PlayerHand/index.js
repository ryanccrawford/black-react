import React, { Component } from 'react';
import PlayCard from '../PlayCard';
import Delay from 'react-delay'


class PlayerHand extends Component {

    state = {
        cards: []
    }
    constructor(props) {
        super(props)
        this.state.cards = props.cards

    }

   render() {

        return (
            <div className="row player">
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
                            rank={card.rank}
                            suit={card.suit}
                            hidden={card.facedown}
                            ></PlayCard>
                        </Delay>
                    )
                })}

           </div>
        );
    }



}

export default PlayerHand;
