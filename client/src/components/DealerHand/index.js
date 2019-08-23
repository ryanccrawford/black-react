import React, { Component } from 'react';
import PlayCard from '../PlayCard';
import './style.css';
let dealerCounter = 0
class DealerHand extends Component {

    state = {
        cards: []
    }

    constructor(props) {
        super(props)
        console.log(props.cards)
        this.state.cards = props.cards
        this.state.playerPosition = props.playerPosition
        this.dealerCounter = (this.state.playerPosition * 500)
    }
    resetCounter = () => {
        let temp = dealerCounter
        this.dealerCounter = (this.state.playerPosition * 500)
        return temp
    }

    render() {

        return (
            <div className="row dealer">
                <div className="col">
                {console.log("cards")}
                {console.log(this.state.cards)}

                {this.state.cards.map((card, index) => {

                    this.dealerCounter += 500
                    return (


                        <PlayCard
                            key={index}
                            counter={(index + 1) === this.state.cards.length ? (this.resetCounter()) : dealerCounter}
                                owner={"dealer"}
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

export default DealerHand;
