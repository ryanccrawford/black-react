class Player {

    constructor(name, type = "player", bankRoll = 10000 ) {
        this.type = type
        this.name = name
        this.bankRoll = bankRoll
        this.avatar = null
        this.cards = []
        this.split = []
        this.bets = []
        this.validPlays = []
        this.handScore = []

    }

    reset = () => {
        this.cards = []
        this.split = []
        this.bets = []
        this.validPlays = []
        this.handScore = []
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

            if (lowScore === 21 || highScore == 21) {
                this.handScore.push(21)
                return this.handScore
            }
            if ()
        })



    }

}


export default Player;

