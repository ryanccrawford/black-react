import React, { Component } from 'react';

export function Handle({ handle: { id, value, percent }, getHandleProps }) {
    const slider = "./images/betslider/slider.png"
    return (
        <div>
        <img
            style={{
                left: `${percent}%`,
                position: 'absolute',
                top: 19,
                zIndex: 2,
                width: 15,
                height: 15,
                textAlign: 'center',
                cursor: 'pointer',
                right: '39px',

            }}
            {...getHandleProps(id)}
                src={slider} />
            </div>
    )
}


export function Track({ source, target, getTrackProps }) {
        return (
            <div
                style={{
                    position: 'absolute',
                    height: '3px',
                    zIndex: 1,
                    backgroundColor: 'rgb(242, 255, 0)',
                    borderRadius: 5,
                    cursor: 'pointer',
                    top: '24px',
                    left: '10px',
                    width: `${target.percent - source.percent}%`,
                    boxShadow: 'inset 1px 1px 2px 0px black'
                }}
                {...getTrackProps()}
            />
        )
    }

export function Tick(props) {

    return (
        <span className={props.style || ""}>{props.tick || "|"}</span>
            )


}


export function Display(props) {

    return (
        < div className="display"
            style={{backgroundImage: "url('images/betslider/display.png')"
}} >
           <span className="amount">{formatCash(props.value)}</span>
        </div >
        )
}

function formatCash(amount) {
    return "$ " + parseFloat(amount).toFixed(2)
}
