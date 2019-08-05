import React, { Component } from 'react';
import PlayCard from '../PlayCard';
import Delay from 'react-delay'


class PlayerHand extends Component {

    state = {
        cards: []
    }
    constructor(props) {
        super(props)


    }

    componentDidMount() {

        let card = {
            owner: "player_1",
            rank: "A",
            suit: "D",
            hidden: false
        }
        this.setState({ cards: [...this.state.cards, card] })
    }


    render() {

        return (
            <div className="row player">


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
                            hidden={card.hidden}
                            ></PlayCard>
                        </Delay>
                    )
                })}

           </div>
        );
    }



}

export default PlayerHand;
