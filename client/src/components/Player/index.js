import React, { Component } from 'react';

class Player extends Component {

    //name, type = "player", bankRoll = 10000 
    constructor(props) {
        super(props)
        this.state = {
            name: props.name,
            type: props.type || "player",
            bankRoll: props.bankRoll || 10000,
            isTurn: false,
            canBet: false,
            canStay: false,
            canHit: false,
            canDouble: false,
            canSplit: false,
            lastBet: 0,
            avatar: null,
            cards: [],
            split: [],
            bets: [],
            validPlays: [],
            handScore: [],
            moneyWon: 0,
            betbox: true

        }

    }

    setIsTurn = (type) => {
        console.log("inside player.setIsTurn Type:" + type)
        this.setState({ isTurn = true })
        if (type === "bet" && this.state.cards.length < 1) {

            this.setState({ canBet: true })

        } else {
            this.setState({ canBet: false })
        }


    }

    unsetIsTurn = () => {

        this.setState({
            isTurn: false,
            canBet: false,
            canStay: false,
            canHit: false,
            canDouble: false,
            canSplit: false
        })


    }

    reset = () => {
        this.setState({
            cards: [],
            split: [],
            bets: [],
            validPlays: [],
            handScore: [],
            isTurn: false,
            canBet: false,
            canStay: false,
            canHit: false,
            canDouble: false,
            canSplit: false
        })
    }

    isFirstCardTenCard = () => {
        return (this.state.cards[0].value === "A" || this.state.cards[0].value === "10" || this.state.cards[0].value === "Q" || this.state.cards[0].value === "J" || this.state.cards[0].value === "K")
    }

    sumBets = () => {
        let amount = 0
        this.state.bets.forEach((bet) => {
            amount += parseInt(this.state.bets.pop())
        })
        return amount
    }
    setBetBox = (enabled) => {
        this.setState({ betbox: enabled })

    }
    scoreHand = (callBack) => {
       const handScore = []
        let lowScore = 0;
        let highScore = 0;

        this.state.cards.forEach((card) => {
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

            if (lowScore === 21 || highScore === 21) {
                lowScore = 21 
                highScore = 21

            } 
        })

        let setState = this.setState
        callBack(this)
    //{ handScore: [...this.state.handScore, { low: lowScore, high: highScore }] 
       
        

    }

    render() {

    }

}


export default Player;

