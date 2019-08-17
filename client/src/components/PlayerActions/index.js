import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { ToastContainer , toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BetSlider from "../BetSlider";
import './style.css';

//<FontAwesomeIcon icon="check-square" />

 class PlayerActions extends Component {

     constructor(props) {
         super(props)

         this.hitButton = "./images/actionbuttons/HIT.png"
         this.betButton = "./images/actionbuttons/BET.png"
         this.stayButton = "./images/actionbuttons/STAY.png"
         this.doubleButton = "./images/actionbuttons/DOUBLE.png"
         this.splitButton = "./images/actionbuttons/SPLIT.png"
      

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
                     {this.state.betboxEnabled ? (
                         <BetSlider
                             data-player-index={this.state.playerIndex}
                             min={5}
                             max={500}
                             amount={this.state.amount}
                     />) : (null)
                 }
                    
                         <img
                             id={"betButton_" + this.state.playerIndex}
                             data-amount={this.state.amount}
                             data-name={"bet"}
                             data-player-index={this.state.playerIndex}
                             onClick={this.state.actionClick}
                             src={this.betButton}
                             className="btnImage"
                             alt="..." />
                  

                     <img
                         
                         data-name={"hit"}
                         data-player-index={this.state.playerIndex}
                         onClick={this.state.actionClick}
                         src={this.hitButton}
                         className="btnImage"
                         alt="..." />
                     
                     <img
                         
                         data-name={"stay"}
                         data-player-index={this.state.playerIndex}
                         onClick={this.state.actionClick}
                         src={this.stayButton}
                         className="btnImage"
                         alt="..." />
                     <img
                         
                         data-name={"double"}
                         data-player-index={this.state.playerIndex}
                         onClick={this.state.actionClick}
                         src={this.doubleButton}
                         className="btnImage"
                         alt="..." />

                     <img
                        
                         data-name={"split"}
                         data-player-index={this.state.playerIndex}
                         onClick={this.state.actionClick}
                         src={this.splitButton}
                         className="btnImage"
                         alt="..." />
                 </div>
          
         )
     }

}

export default PlayerActions