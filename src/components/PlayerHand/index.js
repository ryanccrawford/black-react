import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Hand, Card, CardBack } from 'react-deck-o-cards';
import { modes } from 'react-transition-group/SwitchTransition';

const defHandStyle = {
    height: 'auto',
    width: '350px',
    padding: 0,
};

class PlayerHand extends Component {

    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <Hand cards={[
                { rank: 1, suit: 0 },
            ]} hidden={false} style={defHandStyle} />
        );
    }



}

export default PlayerHand;
