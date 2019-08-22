import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import GameTable from '../GameTable'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faHandPointUp, faHandPaper, faCoins } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faCheckSquare, faHandPointUp, faHandPaper, faCoins)


export default function GameScreen(props)  {





    let user = sessionStorage.getItem("user")
    if (user) {
        user = JSON.parse(user)
        console.log(user)
    }


    return (
        <Container fixed>
            <GameTable
                isloggedin={user ? true:false}
              />

        </Container>


    );
}

