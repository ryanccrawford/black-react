import React, { Component } from 'react';
import SVG from 'react-inlinesvg';
import Card from '@material-ui/core/Card';
import Delay from 'react-delay'
import ReactCardFlip from 'react-card-flip';
import './style.css';


class PlayCard extends Component {
    state = {}
    constructor(props) {
        super(props)
        const cardRank = {
            "A": "ace_of_",
            "J": "jack_of_",
            "Q": "queen_of_",
            "K": "king_of_",
            "2": "2_of_",
            "3": "3_of_",
            "4": "4_of_",
            "5": "5_of_",
            "6": "6_of_",
            "7": "7_of_",
            "8": "8_of_",
            "9": "9_of_",
            "10": "10_of_"
        }
        const cardSuit = {
            "D": "diamonds",
            "H": "hearts",
            "C": "clubs",
            "S": "spades"
        }
        this.state.owner = props.owner || "none"
        this.state.class = props.class || "col-2 white black-text"
        this.state.type = props.type || "";
        this.state.rank = props.rank || "black";
        this.state.suit = props.suit || "joker";
        this.state.frontImage = "./images/" + cardRank[this.state.rank] + cardSuit[this.state.suit] + this.state.type + ".svg"
        this.state.backImage = "./images/card_back.svg"
        console.log(this.state.backImage)
        this.state.hidden = props.hidden || false;
        this.state.counter = props.counter
    }

    handleClick = (event) => {
        this.setState(prevState => ({ hidden: !prevState.hidden }));
    }

    render() {
        return (
            <Delay
                wait={this.state.counter}
            >
            <div className="slide-in-blurred-tr playing-card display-card ">
            <ReactCardFlip isFlipped={this.state.hidden} flipDirection="horizontal">
                <Card
                    key="front"
                    className="playing-card display-card"
                        data-rank={this.state.owner === "dealer" && this.state.hidden ? "" : this.state.rank}
                        data-suit={this.state.owner === "dealer" && this.state.hidden ? "" : this.state.suit}
                    data-hidden={this.state.hidden}
                        onClick={this.state.owner === "dealer" ? "" : this.handleClick}
                >
                        <SVG
                            className="playing-card"
                            src={this.state.frontImage}
                          />
                </Card>

                <Card
                    key="back"
                    className="playing-card"
                        data-rank={this.state.owner === "dealer" && this.state.hidden ? "" : this.state.rank}
                        data-suit={this.state.owner === "dealer" && this.state.hidden ? "" : this.state.suit}
                    data-hidden={this.state.hidden}
                        onClick={this.state.owner === "dealer" ? "" : this.handleClick}
                >
                    <SVG
                        className="playing-card"
                        src={this.state.backImage}
                    />
                </Card>
                </ReactCardFlip>
                </div>
                </Delay>

        );
    }
}

export default PlayCard;