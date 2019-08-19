import React, { Component } from 'react';
import { Slider, Handles, Tracks, Rail } from 'react-compound-slider'
import { Handle, Track, Tick } from './Parts'


class BetSlider extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: parseInt(props.amount),
            min: parseInt(props.min) || 5,
            max: parseInt(props.max) || 500
        }

    }

    midVal = (min, max) => {

        return (max - min) / 2
    }

    onChange = ([value]) => {
        this.setState({
            value: parseInt(value)
        });
    };


    render() {
        const sliderStyle = { 
            position: 'relative',
            width: '162px',
            height: '90px',
            
            
        }
        const displayStyle = {
            position: 'relative',
            backgroundImage: 'url("images/betslider/display.png")',
            backgroundSize: 'cover',
            width: '150px',
            height: '50px',
            top: '68px',
            left: '33px',
            zIndex: '2'
        }
   
        
        const railStyle = {
            position: 'absolute',
            width: '250px',
            height: '100%',
            right: '-65px',
            marginTop: 35,
            backgroundSize: "cover",
            backgroundImage: 'url("images/betslider/base.png")'
        }
       

        return (
            <div className="betSlider">
                <div style={displayStyle}>{formatCash(this.state.value)}</div>
            <Slider
                rootStyle={sliderStyle} 
                domain={[this.state.min, this.state.max]}
                step={5}
                    mode={2}
                    onChange={this.onChange}
                values={[this.state.value]}
            >
                    <Rail>
                        {({ getRailProps }) => (  
                            <div style={railStyle} {...getRailProps()} />
                        )}
                    </Rail>
                    <Handles>
                        {({ handles, getHandleProps }) => (
                            <div className="slider-handles">
                                {handles.map(handle => (
                                    <Handle
                                        key={handle.id}
                                        handle={handle}
                                        getHandleProps={getHandleProps}
                                    />
                                ))}
                            </div>
                        )}
                    </Handles>
                    <Tracks right={false}>
                        {({ tracks, getTrackProps }) => (
                            <div className="slider-tracks">
                                {tracks.map(({ id, source, target }) => (
                                    <Track
                                        key={id}
                                        source={source}
                                        target={target}
                                        getTrackProps={getTrackProps}
                                    />
                                ))}
                            </div>
                        )}
                    </Tracks>
            </Slider>
           </div>
        )
    }
}

function formatCash(amount) {
    return (<span className="amount">{"$ " + parseFloat(amount).toFixed(0)}</span>)
}


export default BetSlider;
