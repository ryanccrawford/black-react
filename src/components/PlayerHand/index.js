import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PlayCard from '../PlayCard';
import { modes } from 'react-transition-group/SwitchTransition';


class PlayerHand extends Component {

    state = {}
    constructor(props) {
        super(props)
           
    }
    
    render() {

        return (
            <div className="row">
                <PlayCard
                        rank={"A"}
                        suit={"S"}
                        hidden={false}
                    />
                <PlayCard
                        rank={"6"}
                        suit={"D"}
                        hidden={true}
                    />
                <PlayCard
                        rank={"10"}
                        suit={"H"}
                        hidden={false}
                    />
            </div>
        );
    }



}

export default PlayerHand;
