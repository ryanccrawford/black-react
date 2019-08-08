import React from 'react';
import SVG from 'react-inlinesvg';
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



