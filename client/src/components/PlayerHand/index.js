import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Hand, Card, CardBack } from 'react-deck-o-cards';
import { modes } from 'react-transition-group/SwitchTransition';

const defHandStyle = {
    maxHeight: '250px',
    maxWidth: '100px',
    padding: '20px',
};

class PlayerHand extends Component {

    
    
    render() {

        return (
            <div>
                <CardBack ></CardBack>
            <Card rank={2} suit={1}></Card>

            <Hand cards={[
                { rank: 1, suit: 0 }, { rank: 1, suit: 3 }
                ]} hidden={false} style={defHandStyle} />
                </div>
        );
    }



}

export default PlayerHand;
