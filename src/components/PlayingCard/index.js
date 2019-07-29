import React from 'react';
import Component from 'react';
import ReactDOM from 'react-dom';
import { Hand, Card, CardBack } from 'react-deck-o-cards';
import { modes } from 'react-transition-group/SwitchTransition';

const defHandStyle = {
    maxHeight: '34vh',
    minHeight: '34vh',

    maxWidth: '100vw',
    padding: 0,
};

class PlayingCard extends Component {

    constructor(props) {
        super(props)
        this.state.rank = props.rank;
        this.state.suit = props.suit;
      //  this.state.hidden = props.hidden;

    }



    render() {
        return (
            <Card rank={this.state.rank} suit={this.state.suit} />
        );
    }



}

export default PlayingCard;