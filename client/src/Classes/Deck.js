import axios from 'axios'


class Deck {


    constructor(deckReadyCallBack, setDeck, deckId = '', numberOfDecks = 6) {
        console.log(setDeck)
        console.log(deckId)

        this.baseURL = "https://deckofcardsapi.com/api/"
        console.log(deckReadyCallBack)
        this.deckReadyCallBack = deckReadyCallBack
        
        this.deckId = deckId
        this.retry = 3
        this.hasError = false
        this.numberOfDecks = numberOfDecks
        this.deckReadyCallBack = deckReadyCallBack
        this.setDeck = setDeck
        this.cardsRemaining = 0
        
    }

    drawCard = (drawCardCallback, player, number = 1) => {
        if (this.cardsRemaining <= 20) {
            this.getNewDrawDeckShuffle()
            return;
        }
        const apiRoute = this.baseURL + `deck/${this.deckId}/draw/?count=${number}`
        axios.get(apiRoute).then(data => {
            if (data.success) {
                console.log(data)
                this.cardsRemaining = data.remaining
                this.deckId = data.deck_id
                drawCardCallback(data.cards, player)
            }
        }).catch(err => {
            console.log(err)
            drawCardCallback("")
        })


    } 
    getNewDrawDeckShuffle = () => {

        const apiRoute = this.baseURL + "deck/new/shuffle/?deck_count=" + this.numberOfDecks
        axios.get(apiRoute).then(data => {
            if (data.success) {
                this.retry = 3
                console.log("deckid = " + data.deck_id)
                this.setDeck(data.deck_id)
                this.cardsRemaining = data.remaining
                this.deckId = data.deck_id
                this.drawCard(this.deckReadyCallBack)

            }
        }).catch(err => {

        })


    }

    getNewDeckShuffle = () => {
        
        const apiRoute = this.baseURL + "deck/new/shuffle/?deck_count=" + this.numberOfDecks
        const self = this
        axios.get(apiRoute).then(data => {
            if (data.success) {
                self.retry = 3
                console.log("getNewDeck " + data.deck_id)
                self.setDeck(data.deck_id)
                self.cardsRemaining = data.remaining
                self.deckId = data.deck_id
                self.deckReadyCallBack(data.deck_id)

            }
        }).catch(err => {

              console.log(err)
        })


    }

    shuffleThisDeck = () => {
        const apiRoute = this.baseURL + `deck/${this.deckId}/shuffle/`
        axios.get(apiRoute)
            .then(data => {
            if (data.success) {
                this.retry = 3
                this.cardsRemaining = data.remaining
                this.deckReadyCallBack(this.deckId)

            }
            })
            .catch(err => {
             console.log(err)
            
        })

   
    }

}

export default Deck;