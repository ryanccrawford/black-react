import React from 'react';

class Player {

    constructor(name, type = "player", bankRoll = 10000 ) {
        this.type = type
        this.name = name
        this.bankRoll = bankRoll
        this.isTurn = false
        this.canBet = false
        this.canStay = false
        this.canHit = false
        this.canDouble = false
        this.canSplit = false
        this.lastBet = 0
        this.avatar = null
        this.cards = []
        this.split = []
        this.bets = []
        this.validPlays = []
        this.handScore = []

    }

    setIsTurn = (type) => {
        console.log("inside player.setIsTurn Type:" + type)
        this.isTurn = true
        if (type === "bet" && this.cards.length < 1) {
            this.canBet = true;
        }
        

    }

    unsetIsTurn = () => {
       
        this.isTurn = false
        //this.canBet = false
        //this.canStay = false
        //this.canHit = false
        //this.canDouble = false
        //this.canSplit = false


    }

    reset = () => {
        this.cards = []
        this.split = []
        this.bets = []
        this.validPlays = []
        this.handScore = []
        this.isTurn = false
        this.canBet = false
        this.canStay = false
        this.canHit = false
        this.canDouble = false
        this.canSplit = false
    }



    scoreHand = () => {
        this.handScore = []
        let lowScore = 0;
        let highScore = 0;

        this.cards.forEach((card) => {
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
                this.handScore.push({ low: 21, high: 21 })
                return this.handScore
            }
            if (lowScore > 21 && highScore > 21) {
                this.handScore.push({ low: "bust", high: "bust" })
                return this.handScore
            }
            if ((lowScore === 17 || highScore === 17) && this.type === "dealer") {
                this.handScore.push({ low: 17, high: 17 })
                return this.handScore
            }
            this.handScore.push({ low: lowScore, high: highScore })
            return this.handScore
        })



    }

}


export default Player;

