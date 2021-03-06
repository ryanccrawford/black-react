import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Delay from 'react-delay'
import ReactCardFlip from 'react-card-flip';
import './style.css';


class PlayCard extends Component {
    state = {}
    constructor(props) {
        super(props)
        const cardRank = {
            "A": "1",
            "J": "J",
            "Q": "Q",
            "K": "K",
            "2": "2",
            "3": "3",
            "4": "4",
            "5": "5",
            "6": "6",
            "7": "7",
            "8": "8",
            "9": "9",
            "10": "0"
        }
        const cardNumber = {
            "A": "01",
            "J": "11",
            "Q": "12",
            "K": "13",
            "2": "02",
            "3": "03",
            "4": "04",
            "5": "05",
            "6": "06",
            "7": "07",
            "8": "08",
            "9": "09",
            "10": "10"
        }
        const cardSuit = {
            "D": "D",
            "H": "H",
            "C": "C",
            "S": "S"
        }
        this.state.owner = props.owner || "none"
        this.state.class = props.class || "col-2 white black-text"
        this.state.type = props.type || "";
        this.state.rank = props.rank;
        this.state.suit = props.suit;
        this.state.frontImage = "./images/bigcards/" + cardNumber[this.state.rank] + "_" + cardRank[this.state.rank] + "_" + cardSuit[this.state.suit] + ".png"
        this.state.backImage = "./images/bigcards/BACK_3.png"
        this.state.hidden = props.hidden || false;
        this.state.counter = props.counter
    }

    handleClick = (event) => {
        this.setState(prevState => ({ hidden: !prevState.hidden }));
    }
    dummyHandleClick = (event) => {
        console.log("dummy clicked")
    }
    render() {
        return (
            <Delay
                wait={this.state.counter}
            >
            <div className="slide-in-blurred-tr playing-card display-card ">
            <ReactCardFlip isFlipped={this.state.hidden} flipDirection="horizontal">
                <div
                    key="front"
                    className="playing-card display-card"
                        data-rank={this.state.rank}
                        data-suit={this.state.suit}
                        data-hidden={this.state.hidden}
                            onClick={this.state.owner === "dealer" ? this.dummyHandleClick : this.handleClick}
                >
                        <img
                            className="playing-card"
                            src={this.state.frontImage}
                            alt="playing card"
                         />
                </div>

                <div
                    key="back"
                    className="playing-card"
                        data-rank={this.state.owner === "dealer" && this.state.hidden ? "" : this.state.rank}
                        data-suit={this.state.owner === "dealer" && this.state.hidden ? "" : this.state.suit}
                        data-hidden={this.state.hidden}
                            onClick={this.state.owner === "dealer" ? this.dummyHandleClick : this.handleClick}
                >
                    <img
                        className="playing-card"
                                src={this.state.backImage}
                                alt="..."
                    />
                </div>
                </ReactCardFlip>
                </div>
                </Delay>

        );
    }
}

export default PlayCard;