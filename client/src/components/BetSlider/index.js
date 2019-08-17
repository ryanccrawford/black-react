import React, { Component} from 'react';
import './style.css';

class BetSlider extends Component {

    constructor(props) {
        super(props)
        this.base = "./images/betslider/base.png"
        this.button = "./images/betslider/button.png"
        this.display = "./images/betslider/display.png"
        const slots = parseInt((parseInt(props.max) / 100) / 5)
        console.log(slots)
        let min = parseInt(props.min) || 5
        let max = parseInt(props.max) || 500
        let val = parseInt(props.amount)
        this.state = {
            value: val,
            min: min,
            max: max,
            slots: slots
        }

    }

    midVal = (min, max) => {

      return  (max - min) / 2
    }

    MinSlider = () => {
        return (
            <div
                data-slider="min"
                onDragStart={this.onDragStart}
                onTouchStart={this.onDragStart}
                draggable
                className="slider-thumb slider-thumb-min">  
                <img src={this.button} alt="..." />
            </div>
            
        );
    }
    MaxSlider = () => {
        return (
            <div
                data-slider="max"
                onDragStart={this.onDragStart}
                onTouchStart={this.onDragStart}
                draggable className="slider-thumb slider-thumb-max">
                <img src={this.button} alt="..." />
            </div>);
    }
    onDragOver = (e) => {
        e.preventDefault();
    }
    onDragStart = (e) => {
        let slider = e.target.dataset.slider;
        this.sliderType = slider;
    }
    onDrop = (e, target) => {
        let source = this.sliderType;
        let slot = Number(e.target.dataset.slot);
        if (isNaN(slot)) return;
        if (source === "min") {
            if (slot >= this.state.max) return;
            this.setState({ min: slot }, () => { console.log(this.state); })
        } else if (
            source === "max") {
            if (slot <= this.state.min) return;
            this.setState({ max: slot }, () => { console.log(this.state); })
        }
        this.sliderType = null;
    }
        


    render() {

        let scale = [];
        let slider = [];
        let currentScale = [];
        let minThumb = null;
        let maxThumb = null;
        for (let i = 0; i <= this.state.slots; i++) {
            let label = "";
            if (i === this.state.min || i === this.midVal(this.state.min, this.state.max) || i === this.state.max) {
                label = i;
            }
            scale.push(
                <div key={i} className="slot-scale">{label}</div>
            );

            let currentLabel = "";

            if (i === this.state.min || i === this.state.max) {
                currentLabel = i;
            }
            currentScale.push(<div key={i} className="slot-scale-selected">{currentLabel}</div>);

            if (i === this.state.min) {
                minThumb = <this.MinBetSlider />
            } else if (i === this.state.max) {
                maxThumb = <this.MaxBetSlider />
            } else {
                minThumb = null;
                maxThumb = null;
            }
            let lineClass = "line";
            if (i >= this.state.min && i < this.state.max) {
                lineClass += " line-selected";
            }
            slider.push(
                <div
                    data-slot={i}
                    onDragOver={this.onDragOver}
                    onTouchMove={this.onDragOver}
                    onTouchEnd={this.onDrop}
                    onDrop={this.onDrop}
                    key={i}
                    className="slot">
                    <div
                        data-slot={i}
                        className={lineClass}
                    />
                    <span
                        className="scale-mark">
                    </span>
                    {minThumb}
                    {maxThumb}
                </div>
            );


        }
        return (
            <div>
                <div className="display">
                    <img src={this.display} alt="..." />
                    <span className="amount">{formatCash(this.state.value)}</span>
                </div>
                <div className="example-1">
                    <div className="slider-container">
                        <div className="base"><img src={this.base} alt="..." /></div>
                        <div className="slider-scale">
                            {scale}
                        </div>

                        <div className="slider">
                            {slider}
                        </div>

                        <div className="slider-selected-scale">
                            {currentScale}
                        </div>

                    </div>
                </div>
            </div>
        )
   
    }
}

function formatCash(amount) {
    return "$ " + parseFloat(amount).toFixed(2)
}

export default BetSlider;
