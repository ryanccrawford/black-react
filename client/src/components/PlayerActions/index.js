import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { ToastContainer , toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.css';

//<FontAwesomeIcon icon="check-square" />

 class PlayerActions extends Component {

     ranges = [
         {
             value: '5-100',
             label: '5 to 100'
         }
         ]
    classes = makeStyles(theme => ({
        button: {
            margin: theme.spacing(4),
        },
        leftIcon: {
            marginRight: theme.spacing(4),
        },
        rightIcon: {
            marginLeft: theme.spacing(4),
        },
        iconSmall: {
            fontSize: 20,
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
    }));

     constructor(props) {
         super(props)
         this.state = {
             bet: props.bet,
             stay: props.stay,
             hit: props.hit,
             double: props.double,
             split: props.split,
             actionClick: props.actionClick,
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
                     <TextField
                         id="betAmount"
                         label="Amount"
                         value={this.state.amount}
                         onChange={this.onChange}
                         disabled={!this.state.bet}
                         type="number"
                         className={this.classes.textField}
                         InputLabelProps={{
                             shrink: true,
                         }}
                         inputProps={{"step":"5","data-max":"200","data-min":"5","data-player-index": this.state.playerIndex}}
                         margin="normal"
                         variant="outlined"
                     />  
                     <button
                         id={"betButton"}
                         disabled={!this.state.bet}
                         data-name={"bet"}
                         data-player-index={this.state.playerIndex}
                         variant="contained"
                         color="dark"
                         className={"action-button"}
                         onClick={!this.state.bet ? null : this.state.actionClick}
                     >
                         BET
                    <FontAwesomeIcon className={this.classes.rightIcon} icon="coins" />
                    </button>

                     <button
                         disabled={!this.state.hit}
                         data-name={"hit"}
                         data-player-index={this.state.playerIndex}
                         variant="contained"
                         color="dark"
                         className={"action-button"}
                         onClick={!this.state.hit ? null : this.state.actionClick}
                     >
                         HIT
                    <FontAwesomeIcon className={this.classes.rightIcon} icon="hand-point-up" />
                     </button>
                     <button
                         disabled={!this.state.stay}
                         data-name={"stay"}
                         data-player-index={this.state.playerIndex}
                         variant="contained"
                         color="dark"
                         className={"action-button"}
                         onClick={!this.state.stay ? null : this.state.actionClick}
                     >
                         STAY
                    <FontAwesomeIcon className={this.classes.rightIcon} icon="hand-paper" />
                     </button>
                     <button
                         disabled={!this.state.double}
                         data-name={"double"}
                         data-player-index={this.state.playerIndex}
                         variant="contained"
                         color="dark"
                         className={"action-button"}
                         onClick={!this.state.double ? null : this.state.actionClick}
                     >
                         DOUBLE DOWN
                    <FontAwesomeIcon className={this.classes.rightIcon} icon="hand-point-up" />
                     </button>
                     <button
                         disabled={!this.state.split}
                         data-name={"split"}
                         data-player-index={this.state.playerIndex}
                         variant="contained"
                         color="dark"
                         className={"action-button"}
                         onClick={!this.state.split ? null : this.state.actionClick}
                     >
                         SPLIT
                    <FontAwesomeIcon className={this.classes.rightIcon} icon="hand-point-up" />
                     </button>
                 </div>
             </div>
         )
     }

}

export default PlayerActions