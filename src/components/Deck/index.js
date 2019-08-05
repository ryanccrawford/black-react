

class Deck {

    constructor(props) {
        this.deck = [];
        this.numberOfDecks = props.numberOfDecks
        this.reset();
        this.shuffle();

    }

    remaining = () => {
        return this.deck.length
    }

    reset = () => {
        this.deck = [];

        const suits = ['H', 'S', 'C', 'D'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

        for (let i = 0; i < this.numberOfDecks; i++) {
            for (let suit in suits) {
                for (let value in values) {
                    this.deck.push({ value: values[value], suit: suits[suit] });
                }
            }
        }
    }

    shuffle = () => {
        const { deck } = this;
        let m = deck.length, i;

        while (m) {
            i = Math.floor(Math.random() * m--);

            [deck[m], deck[i]] = [deck[i], deck[m]];
        }

        return this;
    }

    deal = (facedown = false) => {
        if (this.remaining === 1) {
            this.reset()
            this.shuffle()
        }
        let card = this.deck.pop()
        card.facedown = facedown
        return card;
    }
}

export default Deck;