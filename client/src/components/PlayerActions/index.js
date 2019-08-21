import React from 'react';
import BetSlider from "../BetSlider";
import Sound from 'react-sound';
import './style.css';







 export default function PlayerActions(props) {


     const hitButton = "./images/actionbuttons/HIT.png"
     const betButton = "./images/actionbuttons/BET.png"
     const stayButton = "./images/actionbuttons/STAY.png"
     const doubleButton = "./images/actionbuttons/DOUBLE.png"
     const splitButton = "./images/actionbuttons/SPLIT.png"

     const bet = props.actions.bet || false
     const stay = props.actions.stay || false
     const hit = props.actions.hit || false
     const split = props.actions.split || false
     const double = props.actions.double || false
     const actionClick = props.actionClick
     const disabledbuttonClick = props.actionDummyClick
     const betboxEnabled = props.actions.bet || false
     const playerIndex = props.playerIndex
     const amount = props.amount
     const dataamount = props.amount
     const maxBet = props.maxBet

         console.log("doing actions, Bet is ")
         console.log(amount)

     return (
     <div>
             {betboxEnabled ? (
                 <div className=""><h3 className="white">Bet Slider</h3>
                     <BetSlider
                         id={"slider_" + playerIndex}

                             data-player-index={playerIndex}
                             min={5}
                             max={maxBet}
                             amount={amount}
                 /></div>) : (null)
                 }
         <div className="button-back">


                         <img
                             id={"betButton_" + playerIndex}
                             data-amount={parseInt(props.amount)}
                             data-name={"bet"}
                             data-player-index={playerIndex}
                             onClick={bet ? actionClick : disabledbuttonClick}
                             src={betButton}
                            className={(bet ? "enabled btnImage" : "btnImage")}
                             alt="..." />


                     <img

                         data-name={"hit"}
                         data-player-index={playerIndex}
                         onClick={hit ? actionClick : disabledbuttonClick}
                         src={hitButton}
                     className={(hit ? "enabled btnImage" : "btnImage")}
                         alt="..." />

                     <img

                         data-name={"stay"}
                         data-player-index={playerIndex}
                         onClick={stay ? actionClick : disabledbuttonClick}
                         src={stayButton}
                     className={(stay ? "enabled btnImage" : "btnImage")}
                     alt="..." />

                     <img

                         data-name={"double"}
                         data-player-index={playerIndex}
                         onClick={double ? actionClick : disabledbuttonClick}
                         src={doubleButton}
                     className={(double ? "enabled btnImage" : "btnImage")}
                         alt="..." />

                     <img

                         data-name={"split"}
                         data-player-index={playerIndex}
                         onClick={split ? actionClick : disabledbuttonClick}
                         src={splitButton}
                     className={(split ? "enabled btnImage" : "btnImage")}
                         alt="..." />

         </div>
       </div>

         )


}
