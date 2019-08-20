import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import GameTable from '../GameTable'
import { ToastContainer, toast } from 'react-toastify';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faHandPointUp, faHandPaper, faCoins } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faCheckSquare, faHandPointUp, faHandPaper, faCoins)


class GameScreen extends Component {




    render() {
       
        return (
            <Container fixed>
                        <GameTable />
                        
            </Container>
           

        );
    }
}

export default GameScreen;
