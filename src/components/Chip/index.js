import React from 'react';
import ReactDOM from 'react-dom';
import SVG from 'react-inlinesvg';
import Delay from 'react-delay'
import ReactCardFlip from 'react-card-flip';
import './style.css';

export default function Chip(props) {
    const chipImage = ".images/chip.svg"
    return (
        
        <SVG
            className="chip"
            backgroundColor="red"
            src={chipImage}
        >{props.amount}</SVG>
        
        
        
        )
}



