import React from 'react';
import SVG from 'react-inlinesvg';
import './style.css';

export default function Chip(props) {
    console.log("inside Chip")
   
    return (
        <div>
        <SVG
            className="chip"
            backgroundColor="red"
                src={"./images/chip.svg"}
        >{props.amount}</SVG>
</div>


        )
}



