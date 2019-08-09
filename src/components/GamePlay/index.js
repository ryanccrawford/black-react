import Deck from '../Deck'
import Player from '../Player'


class GamePlay {


    constructor(options) {
        this.Deck = new Deck();
        
        this.Players = []
        let Dealer = new Player("Dealer", "dealer", 0)
        this.Players.push(Dealer)
        this.Players.push(...options.Players)
        this.round = 0
        this.PlayerTurn = 0
    }

    startGame = () => {
        this.Deck.reset()
        this.Deck.shuffle()

        this.Players.forEach((player) => {
           player.reset()
        })
        this.round = 0
        this.PlayerTurn = 1
        this.Players[this.PlayerTurn].setIsTurn("bet");
       
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

        this.Players[playerIndex].bankRoll -= amount
        this.Players[playerIndex].bets.push(amount)
        PlayerBetCallback(playerIndex, amount)

    }

    dealOutCards = (sendCard) => {
        this.round++
        for (let j = 0; j < 2; j++) {
            for (let i = 1; i < this.Players.length + 1; i++) {
                let dealerPId = this.Players.length
                let ii = i
                if (i === dealerPId) {
                    ii = 0
                }
                if (ii === 0 && j === 1) {
                    this.Players[ii].cards.push(this.Deck.deal(true))
                    sendCard(this.Players[ii])
                } else {
                    this.Players[ii].cards.push(this.Deck.deal(false))
                    sendCard(this.Players[ii])
                }


            }

        }


    }

    checkDealerisNatural = () => {
        if (this.Players[0].scoreHand().filter(score => (score === 21) ? true : false).length > 0) {
            return true
        }
        return false
    }

    checkPlayerNatural = (index) => {
        if (this.Players[index].scoreHand().filter(score => (score === 21) ? true : false).length > 0) {
            return true
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

    hit = (playerIndex) => {
        let card = this.Deck.deal(false)
        this.Players[playerIndex].cards.push(card)
        //TODO ADD VALID PLAYS AFTER HIT

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

}

export default GamePlay;
