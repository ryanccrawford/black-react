import React, { Component } from "react";
import { Container } from "@material-ui/core"
import { Card } from "@material-ui/core"
import PlayingCard from "../PlayingCard"

class Player extends Component {



    
    constructor(props) {
        super(props)
        console.log("Player")
        console.log(props)
       this.state = {
           cards: props.cards,
           name: props.name,
           isTurn: props.isTurn,
           key: props.key
        };

       }
    render() {
        return (
            <Container>
                
                <h1>Player {parseInt(this.state.key) + 1}: {this.state.name}</h1>
                
                    
                        {this.state.cards.map((card,index) => {
                        return (
                            <Card>
                                <PlayingCard 
                                    card={card}
                                    key={index}
                                    isHidden={false}

                                ></PlayingCard>
                            </Card>
                        )
                        })}
               

            </Container>
        );
    }
}

export default Player