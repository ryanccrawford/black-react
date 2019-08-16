import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { ToastContainer , toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.css';

//<FontAwesomeIcon icon="check-square" />

 class PlayerActions extends Component {

     constructor(props) {
         super(props)
         console.log(props)
         this.state = {
             bet: props.gamePlay.Players[props.playerIndex].canBet,
             stay: props.gamePlay.Players[props.playerIndex].canStay,
             hit: props.gamePlay.Players[props.playerIndex].canHit,
             split: props.gamePlay.Players[props.playerIndex].canSplit,
             actionClick: props.actionClick,
             betboxEnabled: props.betbox,
             playerIndex: props.playerIndex,
             amount: props.amount
         }
     }

     onChange = (event) => {
         console.log("inside on change")
         const min = parseInt(event.target.getAttribute("data-min"));
         const max = parseInt(event.target.getAttribute("data-max"));
         const playerIndex = parseInt(event.target.getAttribute("data-player-index"));
         console.log(event.target)
         let newValue = parseInt(event.target.value)
         if (newValue < min) {
             newValue = min
         }
         if (newValue > max) {
             newValue = max
         }

         this.setState({ amount: newValue})

     }

     render() {
   
         return (
             <div>

                 <div variant="contained"
                     color="inherit"
                     size="large"
                     aria-label="large contained primary button group"
                 >
                     {this.state.betboxEnabled ? (<TextField
                         id={"betAmount_" + this.state.playerIndex}
                         label="Amount"
                         value={this.state.amount}
                         onChange={this.onChange}

                         type="number"
                        
                         InputLabelProps={{
                             shrink: true,
                         }}
                         inputProps={{"step":"5","data-max":"200","data-min":"5","data-player-index": this.state.playerIndex}}
                         margin="normal"
                         
                     />) : (null)}
                     <button
                         id={"betButton_" + this.state.playerIndex}
                         data-name={"bet"}
                         data-player-index={this.state.playerIndex}
                         onClick={this.state.actionClick}
                     >
                         BET
                    <FontAwesomeIcon icon="coins" />
                     </button>

                     <button
                         
                         data-name={"hit"}
                         data-player-index={this.state.playerIndex}
                         onClick={this.state.actionClick}
                     >
                         HIT
                    <FontAwesomeIcon icon="hand-point-up" />
                     </button>
                     <button
                         
                         data-name={"stay"}
                         data-player-index={this.state.playerIndex}
                         onClick={this.state.actionClick}
                     >
                         STAY
                    <FontAwesomeIcon icon="hand-paper" />
                     </button>
                     <button
                         
                         data-name={"double"}
                         data-player-index={this.state.playerIndex}
                         onClick={this.state.actionClick}
                     >
                         DOUBLE DOWN
                    <FontAwesomeIcon icon="hand-point-up" />
                     </button>
                     <button
                        
                         data-name={"split"}
                         data-player-index={this.state.playerIndex}
                         onClick={this.state.actionClick}
                     >
                         SPLIT
                    <FontAwesomeIcon icon="hand-point-up" />
                     </button>
                 </div>
             </div>
         )
     }

}

export default PlayerActions