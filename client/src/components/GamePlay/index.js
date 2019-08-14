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
        this.PlayerTurn = 1
        this.renderCard = null;
    }

    startGame = (callBack) => {
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

        this.Players[playerIndex].lastBet = amount
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
     return  this.checkPlayerNatural(0);
    }

    checkPlayerNatural = (index) => {
        if (this.Players[index].cards.length) {
            let scoreH = this.Players[index].scoreHand()
            console.log(scoreH)

            if (scoreH.filter(score => (score.high === 21 || score.low === 21) ? true : false).length > 0) {
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
