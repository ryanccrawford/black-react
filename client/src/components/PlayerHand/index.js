import React, { Component } from 'react';
import PlayCard from '../PlayCard';
import Badge from '@material-ui/core/Badge';
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

    scoreCards = () => {
        let cards = this.state.cards
        let lowScore = 0;
        let highScore = 0;

        cards.forEach((card) => {
            if (card.value === 'A') {
                lowScore += 1
                highScore += 11
            } else
                if (card.value === 'J' || card.value === 'K' || card.value === 'Q' || card.value === '10') {
                    lowScore += 10
                    highScore += 10
                }
                else {
                    let intVal = parseInt(card.value)
                    lowScore += intVal
                    highScore += intVal
                }


        })
        if (lowScore === highScore) {
            return highScore
        }
        return lowScore + "/" + highScore

    }

   render() {
       let score = this.scoreCards()
       return (

           <Badge className="score-count"
               badgeContent={score}
           >

           <div className="row player">
                <div className="col">

                {console.log("cards")}
                {console.log(this.state.cards)}

                {this.state.cards.map((card, index) => {
                    return (

                         <PlayCard
                            key={"playingCard"+index}

                            counter={(index + 1) * ((parseInt(this.state.playerPosition)*2) * parseInt(this.state.playerPosition)) * 200}
                            owner={card.owner}
                            rank={card.value}
                            suit={card.suit}
                            hidden={card.facedown}
                            ></PlayCard>

                    )
                })}
                    </div>
           </div></Badge>
        );
    }



}

export default PlayerHand;
