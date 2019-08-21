import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PlayerActions from '../PlayerActions';
import PlayerHand from '../PlayerHand';
import DealerHand from '../DealerHand';
import PlayerBet from '../PlayerBet';
import BankDisplay from '../BankDispaly';
import Deck from '../Deck';
import Sound from 'react-sound';
import './style.css';

class player {

    constructor(options) {
        console.log("Building Player")
        this.name = options.name
        this.type = options.type
        this.bankRoll = options.bankRoll || 10000
        this.cards = []
        this.bet = 0
        this.actions = options.actions
        this.playerIndex = options.playerIndex
        this.GotCardCallBack = options.GotCardCallBack
        this.ActionsChangedCallBack = options.ActionsChangedCallBack
        this.CardsCleardCallBack = options.CardsCleardCallBack
        this.doUpdate = options.doUpdate
        this.lastBet = 0

    }

    makeBet = (amount) => {
        this.lastBet = amount
        this.bankRoll -= amount
        this.bet += amount
        return this.bet
    }

    giveWinnings = (amount) => {
        this.bankRoll += amount
        return
    }

    clearBet = () => {
        this.bet = 0
        return
    }

    givePlayerCard = (card) => {
        this.cards.push(card)
        setTimeout(this.GotCardCallBack, 500)

    }

    countCards = () => {
        return this.cards.length
    }

    clearCards = (startRound = false) => {
        this.cards = []
        console.log("clearing cards")
        if (startRound) {
            return;
        }
        this.CardsCleardCallBack(this.playerIndex)
    }

    giveActions = (actions) => {
        this.clearActions()
        console.log("inside giving actions")
        console.log(actions)
        this.actions = actions
        console.log(this.actions)
        this.ActionsChangedCallBack(this.playerIndex)
    }

    clearActions = () => {
        this.actions = {}
    }

}



class GameTable extends Component {


    constructor(props) {
        super(props)

        let dealerOptions = {
            name: "Dealer",
            type: "dealer",
            actions: {},
            playerIndex: 0,
            GotCardCallBack: this.GotCardCallBack,
            ActionsChangedCallBack: this.ActionsChangedCallBack,
            CardsCleardCallBack: this.CardsCleardCallBack,
            doUpdate: this.doUpdate
        }
        let playerOptions = {
            name: "Ryan",
            type: "player",
            bankRoll: 10000,
            actions: {},
            playerIndex: 1,
            GotCardCallBack: this.GotCardCallBack,
            ActionsChangedCallBack: this.ActionsChangedCallBack,
            CardsCleardCallBack: this.CardsCleardCallBack,
            doUpdate: this.doUpdate
        }

        let player0 = new player(dealerOptions)
        let player1 = new player(playerOptions)
        this.Players = []
        this.Players.push(player0)
        this.Players.push(player1)
        this.Deck = new Deck({ numberOfDecks: 6 })
        console.log("created Deck")
        this.state = {
            cardsDelt: false,
            Bets: [],
            playerTurnIndex: 1,
            round: 0,
            gameSegment: "bet",
            //players: .Players,
            shuffleDeckMessage: "",
            clickSound: false
        }


    }



    componentDidMount() {
        console.log("Component Mounted")

        this.startRound();


    }


    cardsDelt = () => {


        this.setState({ cardsDelt: true })
        //steps to check game outcome
        this.checkNaturals(this.wasNaturalGame, this.continueGame, this.renderCardsCB)
        //if so check to see if dealer has 21 if so
        //close game and return all bets. IF not payout players with
        //21 2:1 and all players who don't house keeps there money

    }

    continueGame = () => {


    }

    wasNaturalGame = () => {

        this.renderCardsCB()


    }

    componentDidUpdate() {
        console.log("Component Did Updatde")
    }

    setPlayersTurn = (playerindex) => {
        console.log("Inside Set Player turn Player number " + playerindex)

        if (playerindex === 0 && this.state.round === 0) {
            this.setState({ round: this.state.round + 1 })
            this.GamePlay.dealOutCards(this.cardsDelt)

        } else if (playerindex !== 0 && this.state.round === 0 && this.GamePlay.Players[playerindex].bets.length < 1) {
            console.log("Player is not the dealer and its first betting round and no bets have been made. ")
            this.GamePlay.Players[playerindex].canBet = true;
            console.log("we just set the player canBet to True")
            this.setState({ playerTurnIndex: playerindex })

        } else if (playerindex !== 0 && this.state.round === 1) {
            this.GamePlay.Players[playerindex].setIsTurn("play")
            this.GamePlay.Players[this.state.playerTurnIndex - 1].unsetIsTurn()
            this.setState({ playerTurnIndex: playerindex })

        }

    }

    actionClick = (event) => {

        console.log(event)
        console.log(event.target)
        const name = event.target.getAttribute("data-name");
        console.log(name)
        const playerIndex = parseInt(event.target.getAttribute("data-player-index"));

        console.log(playerIndex)
        if (name === "bet" && this.Players[playerIndex].bet <= 0) {
            //  let target = document.getElementById("slider_" + playerIndex);

            const amount = parseInt(document.getElementById("betAmount").innerHTML);
            console.log("Placing Bet")

            this.Players[playerIndex].makeBet(amount)

            this.Players[playerIndex].clearActions()
            this.setState({ clickSound: true }, this.dealOut)

            return

        }
        if (name === "hit" && playerIndex) {

            this.hit(playerIndex, this.hitCallBack)

        }

        if (name === "stay" && playerIndex) {

            this.stay(playerIndex, this.stayCallback)

        }


    }

    dealOut = () => {


        this.dealOutCards(this.cardsDelt)



    }


    handleChange = (event) => {

        console.log("Handle Change")

    }


    scoreCards = (cards) => {

        let lowScore = 0;
        let highScore = 0;

        cards.forEach((card) => {
            if (card.value === 'A') {
                lowScore += 1
                highScore += 11
            } else
                if (card.value === 'J' || card.value === 'K' || card.value === 'Q' || card.value === '10') {
                    lowScore += 10
                    highScore += 10
                }
                else {
                    let intVal = parseInt(card.value)
                    lowScore += intVal
                    highScore += intVal
                }

        })

        return { low: lowScore, high: highScore };

    }
    hitCallBack = (playerIndex) => {

        this.forceUpdate()

    }



    renderCardsCB = () => {
        this.setState({ cardsDelt: false }, this.setState({ cardsDelt: true }))


    }


    /******************************************************************
     *
     *
     * Game Logic
     *
     *
     * */

    startRound = () => {
        if (this.Deck.remaining < 12 || !this.Deck.isShuffled) {
            console.log("geeting ready to shuffle")
            this.shuffelDeck();
            return;
        }


        for (let i = 0; i < this.Players.length; i++) {
            this.Players[i].clearCards(true)
        }

        this.getBets(this.state.playerTurnIndex)

    }

    getBets = (index) => {
        const bets = { bet: true }
        console.log(bets)
        this.Players[index].giveActions(bets)



    }


    shuffelDeck = () => {
        this.Deck.reset()
        this.Deck.shuffle()
        console.log("Shuffling")
        this.setState({ shuffleDeckMessage: "Shuffling Deck" }, this.shuffleTimer)

    }

    shuffleTimer = () => {
        setTimeout(this.doneWithShuffle, 5000)
    }

    doneWithShuffle = () => {
        this.setState({ shuffleDeckMessage: "" }, this.startRound)
    }

    GotCardCallBack = (playerIndex) => {
        console.log("Player " + playerIndex + " Got Card")
        this.forceUpdate()
    }
    ActionsChangedCallBack = (playerIndex) => {
        console.log("Player " + playerIndex + " Got Action")
        this.forceUpdate()
    }
    CardsCleardCallBack = (playerIndex) => {
        console.log("Player " + playerIndex + " is cleared")
        this.forceUpdate()
    }
    doUpdate = () => {
        this.forceUpdate();
    }


    disabledbuttonClick = () => {
        console.log("Dummy button click")
    }

    getNextPlayer = () => {
        console.log(this.PlayerTurn)
        console.log(this.Players)
        if ((this.PlayerTurn + 1) === (this.Players.length)) {
            this.PlayerTurn = 0
        } else {
            this.PlayerTurn++
        }
        return this.PlayerTurn
    }

    placeBet = (playerIndex, amount, PlayerBetCallback) => {

        this.Players[playerIndex].lastBet = amount
        this.Players[playerIndex].bankRoll -= amount
        this.Players[playerIndex].bets.push(amount)

        PlayerBetCallback(playerIndex, amount)

    }

    dealOutCards = () => {

        for (let j = 0; j < 2; j++) {
            for (let i = 1; i < this.Players.length + 1; i++) {
                let dealerPId = this.Players.length
                let ii = i
                if (i === dealerPId) {
                    ii = 0
                }
                if (ii === 0 && j === 1) {
                    this.Players[ii].givePlayerCard(this.Deck.deal(true))
                    //sendCard(this.Players[ii])
                } else {
                    this.Players[ii].givePlayerCard(this.Deck.deal(false))
                   // sendCard(this.Players[ii])
                }


            }

        }


    }

    //Check if anyone that is not a dealer has 21 and if so
    //Check to seee if the dealers first card (face up) is an ace or a 10 J Q K if it s check to see if the dealer
    //has 21 but don't reveal the facedown card if
    checkNaturals = (cbTrue, cbFalse, renderCardcb) => {
        this.renderCard = renderCardcb
        let playersWithNaturals = []
        let numberOfPlayers = this.Players.length
        for (let i = 1; i < numberOfPlayers; i++) {
            if (this.checkPlayerNatural(i)) {
                playersWithNaturals.push(i)
            }
        }
        if (playersWithNaturals.length > 0) {
            let dealerMightHaveNatural = this.Players[0].isFirstCardTenCard()
            //check if dealer has first card face 10 if not pay out all players with 21 1.5 x each players bet
            if (!dealerMightHaveNatural) {
                this.payOutNaturals(playersWithNaturals)


            } else {
                //check if dealerHas 21 if not then
                if (!this.checkDealerisNatural) {
                    this.payOutNaturals(playersWithNaturals)

                } else {
                    this.payOutNaturals(playersWithNaturals, 1)

                }

            }

            cbTrue();

        } else {
            cbFalse();
        }

    }

    payOutNaturals = (naturalsArray, amountMul = 1.5) => {
        while (naturalsArray.length > 0) {
            let indx = naturalsArray.pop()
            this.payOut(indx, amountMul)
        }
        this.Players[0].cards = []
        this.renderCard(0)

    }

    payOut = (playerIndex, multiPlier) => {
        let sumOfBets = this.Players[playerIndex].sumBets()
        let potWon = sumOfBets * multiPlier
        let amountOfWin = potWon - sumOfBets
        this.Players[playerIndex].bankRoll += potWon
        this.Players[playerIndex].moneyWon += amountOfWin
        // this.Players[playerIndex].cards = []
        this.renderCard(playerIndex)
    }


    checkDealerisNatural = () => {
        return this.checkPlayerNatural(0);
    }

    checkPlayerNatural = (index) => {
        if (this.Players[index].cards.length) {
            let scoreH = this.scoreCards(this.Players[index].cards)
            console.log(scoreH)

            if (scoreH.high === 21) {
                console.log("Player " + index + " Has 21")
                return true
            }
        }
        return false


    }

    getValidPlays = (playerIndex) => {




    }

    bet = (playerIndex) => {
        let card = this.Deck.deal(false)
        this.Players[playerIndex].cards.push(card)
        //TODO ADD VALID PLAYS AFTER HIT

    }

    hit = (playerIndex, callback) => {
        this.Players[playerIndex].cards.push(this.Deck.deal(false))
        console.log("just did hit")
        let s = this.Players[playerIndex].scoreHand()[this.Players[playerIndex].handScore.length - 1]
        console.log(s)
        callback(playerIndex, s)

    }

    stay = (playerIndex) => {
        let card = this.Deck.deal(false)
        this.Players[playerIndex].cards.push(card)
        //TODO ADD VALID PLAYS AFTER HIT

    }
    double = (playerIndex) => {
        let card = this.Deck.deal(false)
        this.Players[playerIndex].cards.push(card)
        //TODO ADD VALID PLAYS AFTER HIT

    }
    split = (playerIndex) => {
        let card = this.Deck.deal(false)
        this.Players[playerIndex].cards.push(card)
        //TODO ADD VALID PLAYS AFTER HIT

    }




    componentWillUpdate() {
        console.log("Component about to update")
    }

    render() {
        const tableImage = "./images/tables/table.jpg"
        console.log("Started render")
        return (

            <div className={"game-table"}>
                <div className={(this.state.shuffleDeckMessage !== "" ? "show " : "hide ") + "message"}>
                    {this.state.shuffleDeckMessage !== "" ? (<Sound
                        url="./sfx/shuffling.mp3"
                        playStatus={"PLAYING"}
                    />) : (null)}
                    <p>{this.state.shuffleDeckMessage}</p>
                </div>
                <div className={"box"}>
                    <img className={"table"} src={tableImage} alt="..." />
                    <Grid container spacing={2}>
                        {this.Players.map((player, index) => {
                            if (index === 0) {
                                return (
                                    <Grid item xs={12}>
                                        <div className="hand">
                                            {player.cards.length > 0 ? (
                                                <DealerHand
                                                    key={"dealer"}
                                                    playerPosition={(this.Players.length + 1)}
                                                    isPlayerTurn={"test"}
                                                    cards={player.cards}
                                                />) : (null)
                                            }

                                        </div>

                                    </Grid>
                                )
                            } else {
                                return (
                                    <div>
                                        <BankDisplay
                                            name={player.name}
                                            bank={player.bankRoll}
                                            bet={player.bet}
                                        />
                                        {player.cards.length > 0 ? (
                                            <div className={player.name + " playerhand-" + player.playerIndex}>
                                                <PlayerHand
                                                    key={player.name}
                                                    round={this.state.round}
                                                    playerPosition={player.playerIndex}
                                                    cards={player.cards}
                                                />
                                            </div>
                                        ) : (null)}

                                        <Grid item xs={12}>

                                            {player.bet > 0 ? (
                                                <div className="betbox">
                                                    <PlayerBet
                                                        key={"bet_" + player.playerIndex}
                                                        playerIndex={player.playerIndex}
                                                        amount={player.bet}
                                                    />
                                                </div>
                                            ) : (null)
                                            }
                                            <div className="actionbox">

                                                <PlayerActions
                                                    key={"actions_" + player.playerIndex}
                                                    betbox={(this.state.gameSegment === "bet")}
                                                    amount={player.lastBet}
                                                    player={player}
                                                    maxBet={player.bankRoll}
                                                    playerIndex={player.playerIndex}
                                                    actions={player.actions}
                                                    actionClick={this.actionClick}
                                                    actionDummyClick={this.disabledbuttonClick}
                                                />
                                                {this.state.clickSound ? (<Sound
                                                    url="./sfx/click.mp3"
                                                    playStatus={"PLAYING"}
                                                />) : (null)}
                                            </div>
                                           
                                        </Grid>
                                    </div>

                                )
                            }
                        }

                        )
                        }
                    </Grid>

                </div>


            </div>
        );
    }

}
export default GameTable
