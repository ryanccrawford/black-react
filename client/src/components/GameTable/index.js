import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import {
    withRouter
} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import PlayerActions from '../PlayerActions';
import PlayerHand from '../PlayerHand';
import DealerHand from '../DealerHand';
import PlayerBet from '../PlayerBet';
import BankDisplay from '../BankDispaly';
import Deck from '../Deck';
import Sound from 'react-sound';
import Draggable from 'react-draggable'
import GameResult from '../GameResult'
import CircularProgress from '@material-ui/core/CircularProgress';
import './style.css';
import { setTimeout } from 'timers';
import { makeStyles } from '@material-ui/core/styles';
import windowSize from 'react-window-size';
import TopBar from '../TopBar'
let showingmessage = false;

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

    payBet = () => {
        let tempBet = this.bet;
        this.bet = 0
        return tempBet
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
        this.loggedIn = false
        let playerOptions = null
        let playerFromSession = sessionStorage.getItem("player")
        let sessionPlayer = JSON.parse(playerFromSession)
        console.log(sessionPlayer)
        if (sessionPlayer) {
            this.loggedIn = true
            playerOptions = {
                id: sessionPlayer.id,
                name: sessionPlayer.name.toUpperCase(),
                type: "player",
                bankRoll: parseInt(sessionPlayer.bankRoll),
                actions: {},
                playerIndex: 1,
                GotCardCallBack: this.GotCardCallBack,
                ActionsChangedCallBack: this.ActionsChangedCallBack,
                CardsCleardCallBack: this.CardsCleardCallBack,
                doUpdate: this.doUpdate
            }
        } else {
            this.loggedIn = true
            playerOptions = {
                name: "Guest",
                type: "player",
                bankRoll: 1000,
                actions: {},
                playerIndex: 1,
                GotCardCallBack: this.GotCardCallBack,
                ActionsChangedCallBack: this.ActionsChangedCallBack,
                CardsCleardCallBack: this.CardsCleardCallBack,
                doUpdate: this.doUpdate
            }
        }
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


        let dealer = new player(dealerOptions)
        let player1 = new player(playerOptions)
        this.Players = []
        this.Players.push(dealer)
        this.Players.push(player1)
        this.Deck = new Deck({ numberOfDecks: 6 })


        this.state = {
            cardsDelt: false,
            Bets: [],
            playerTurnIndex: 1,
            round: 0,
            gameSegment: "bet",
            shuffleDeckMessage: "",
            clickSound: false,
            hideActionBar: false,
            gameHasResult: false,
            gameResult: ""
        }


    }

    showGameResult = (type = "win") => {

        this.setState({gameHasResult: true, gameResult: type})

    }

    closeGameResult = () => {

        this.setState({ gameHasResult: false, gameResult: "" })

    }

    componentDidMount() {
        console.log("Component Mounted")

        this.startRound();


    }



    continueGame = () => {


    }

    wasNaturalGame = () => {

        this.renderCardsCB()


    }

    doPlayer21 = (playerIndex) => {
        this.payOut(playerIndex, 1.5)

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
        if (name === "hit" && playerIndex > 0) {

            this.hit(playerIndex, this.hitCallBack)
            return
        }

        if (name === "stay" && playerIndex > 0) {
            console.log("stay")
            this.Players[playerIndex].clearActions()
            this.setState({ playerTurnIndex: 0 }, this.dealerMove)
            return
        }

    }


    dealerMove = () => {
    setTimeout(this.dealerPlays, 2000)

    }

    dealerPlays = () => {
        this.Players[0].cards.forEach((card, index) => {
            card.facedown = false;
        })
        this.forceUpdate(this.nextMove)

    }

    nextMove = () => {

        let sc = this.scoreCards(this.Players[0].cards)
        let winner = null
        if (sc.high > 21) {
            console.log("dealer bust")
            this.Players.forEach((player, index) => {

                let pls = this.scoreCards(player.cards)
                if (pls <= 21) {
                    winner = player.index
                    console.log("you won")
                }
            })
        }
        if (sc.high < 17) {

            console.log("Take another card")

        }
    }



    dealOut = () => {


        this.dealOutCards(this.cardsDelt)
        for (let o = 1; o < this.Players.length; o++) {
            this.doRound(o)
        }

    }

    flipDealerCard = () => {
        console.log("flipping dealers card")
        this.Players[0].cards[1].facedown = false;
        this.forceUpdate()
    }

    doRound = (playerIndex) => {
        let varStatus = ""

        let score = this.scoreCards(this.Players[playerIndex].cards)
        if (score.low === 21 || score.high === 21) {
            console.log("YES 21")
            varStatus = "21"
        }
               varStatus = "hit"
        if (score.low >= 21 && score.high >= 21) {
            console.log("Busted")
             varStatus = "busted"
        }
        this.setState({ gameSegment: varStatus})

    }
    /*
     DRAGGABLE
     */
    getInitialState = () => {
        return {
            activeDrags: 0,
            deltaPosition: {
                x: 0, y: 0
            },
            controlledPosition: {
                x: -400, y: 200
            }
        };
    }

    handleDrag = (e, ui) => {
        const { x, y } = this.state.deltaPosition;
        this.setState({
            deltaPosition: {
                x: x + ui.deltaX,
                y: y + ui.deltaY,
            }
        });
    }

    onStart  = ()  => {
        this.setState({ activeDrags: this.state.activeDrags + 1 });
    }

    onStop = () => {
        this.setState({ activeDrags: this.state.activeDrags - 1 });
    }

    // For controlled component
    adjustXPos =(e)=> {
        e.preventDefault();
        e.stopPropagation();
        const { x, y } = this.state.controlledPosition;
        this.setState({ controlledPosition: { x: x - 10, y } });
    }

    adjustYPos = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { controlledPosition } = this.state;
        const { x, y } = controlledPosition;
        this.setState({ controlledPosition: { x, y: y - 10 } });
    }

    onControlledDrag = (e, position) => {
        const { x, y } = position;
        this.setState({ controlledPosition: { x, y } });
    }

    onControlledDragStop = (e, position) => {
        this.onControlledDrag(e, position);
        this.onStop();
    }
    /******************************************************/

    componentDidUpdate() {



        if (this.state.gameSegment === "bet") {
            const bet = { bet: true }
           this.Players[this.state.playerTurnIndex].giveActions(bet)

        }
        if (this.state.gameSegment === "hit" || this.state.gameSegment === "stay") {
            let score = this.scoreCards(this.Players[this.state.playerTurnIndex].cards)
            if (score.low === 21 || score.high === 21) {
                const win = {}
                this.Players[this.state.playerTurnIndex].giveActions(win)


            }
            if (score.low < 21) {
                if (this.state.gameSegment === "hit" || this.state.gameSegment === "stay") {
                    const hit = { hit: true, stay: true }
                    this.Players[this.state.playerTurnIndex].giveActions(hit)

                }
            }
            if (score.low >= 22) {
                console.log("busted")

                const busted = {}
                this.Players[this.state.playerTurnIndex].giveActions(busted)
                this.Players[this.state.playerTurnIndex].payBet(this.forceUpdate)

            }

        }

    }

    checkScore = (score) => {




    }

    handleChange = (event) => {

        console.log("Handle Change")

    }


    scoreCards = (cards) => {
        console.log("inside cards")
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

        this.setState({ gameSegment: "hit"})

    }
    stayCallBack = (playerIndex) => {
        let dealerNext = false

        dealerNext = (this.state.playerTurnIndex === (this.Players.length - 1)) ?  true : false
        let setThis = {}
        if (dealerNext) {
            setThis.next = 0
        } else {
            setThis.next = this.state.playerTurnIndex + 1
        }
        console.log("stayCallback")

        this.setState({playerTurnIndex: setThis.next, gameSegment: "hit" , hideActionBar: true})


    }


  //  renderCardsCB = () => {
   //     this.setState({ cardsDelt: false }, this.setState({ cardsDelt: true }))


   // }


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
        this.setState({ shuffleDeckMessage: "Hello, "+ this.Players[this.state.playerTurnIndex].name.toUpperCase() + " welcome back! Shuffling Deck" }, this.shuffleTimer)

    }

    shuffleTimer = () => {
        setTimeout(this.doneWithShuffle, 5000)
    }

    doneWithShuffle = () => {
        this.setState({ shuffleDeckMessage: "" }, this.startRound)
    }

    GotCardCallBack = (playerIndex) => {
        console.log("Player " + playerIndex + " Got Card")
        this.doUpdate()
    }
    ActionsChangedCallBack = (playerIndex) => {
        console.log("Player " + playerIndex + " Got Action")
        //this.forceUpdate()
    }
    CardsCleardCallBack = (playerIndex) => {
        console.log("Player " + playerIndex + " is cleared")
        this.doUpdate()
    }
    doUpdate = () => {
        this.forceUpdate();
    }


    disabledbuttonClick = () => {
        console.log("Dummy button click")
    }

    getNextPlayer = () => {
        console.log(this.state.playerTurnIndex)
        let pt = this.state.playerTurnIndex
        if ((this.state.playerTurnIndex + 1) === (this.Players.length)) {
            pt = 0
        } else {
            pt++
        }
        this.setState({ playerTurnIndex: pt },() => this.state.playerTurnIndex)

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



    hit = (playerIndex, callback) => {
        this.Players[playerIndex].cards.push(this.Deck.deal(false))
        console.log("just did hit")

        this.forceUpdate(this.checkHand)

    }

    stay = (playerIndex, callBack) => {
        let actions = {}
        this.Players[playerIndex].giveActions(actions)
        this.stayCallBack(playerIndex)
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

    render() {

        console.log("Started render")
        const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
        const { deltaPosition, controlledPosition } = this.state;
        const width = this.props.windowWidth
        const height = this.props.windowHeight
        let classes = {
            table: {
                width: width,
                maxWidth: width,
                position: "fixed",
                zIndex: "-4",
                left: "0"

            }
        }

        return (
            <div>
                {!this.loggedIn ? (<Redirect to="/"/>) : (null)}
                <Sound
                    url="/sfx/music2.mp3"
                    playStatus={'PLAYING'}
                    onLoading={(<div>
                            <CircularProgress color="secondary" />
                        </div>)
                    }
                    volume={3}
                />

                {this.state.gameHasResult ? (
                    <GameResult
                    isOpen={true}
                    type={this.state.gameResult}
                        title={this.state.gameResult === "win" ? "Your A Winner!" : "Oh No Better Luck Next Time!"}
                />) : (null)}


                <div className={(this.state.shuffleDeckMessage !== "" ? "show " : "hide ") + "message"}>
                    {this.state.shuffleDeckMessage !== "" ? (<Sound
                        url="./sfx/shuffling.mp3"
                        playStatus={"PLAYING"}
                    />) : (null)}
                    <p>{this.state.shuffleDeckMessage}</p>
                </div>
                <img src={"/images/tables/table.jpg"} style={classes.table}/>
                <div>
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
                                                <div className="chipbox">
                                                    <PlayerBet
                                                        key={"bet_" + player.playerIndex}
                                                        playerIndex={player.playerIndex}
                                                        amount={player.bet}
                                                    />
                                                </div>
                                            ) : (null)
                                            }
                                            {!this.state.hideActionBar ? (
                                                <Draggable {...dragHandlers}>
                                                    <div className="actionbox" style={classes.table}>

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
                                                    </div></Draggable>) : (null)}
                                            <TopBar></TopBar>
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
export default windowSize(GameTable)
