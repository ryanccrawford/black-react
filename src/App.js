import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TopBar from './components/TopBar';
import GameTable from './components/GameTable'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faHandPointUp, faHandPaper, faCoins} from '@fortawesome/free-solid-svg-icons'
library.add(fab, faCheckSquare, faHandPointUp, faHandPaper, faCoins )


class App extends Component {




    render() {

        return (
            <div>
                <CssBaseline />
                <Container maxWidth="lg">
                    <TopBar>
                    </TopBar>
                    <Container>
                        <GameTable />

                   </Container>
                </Container>
            </div>
        );
    }
}

export default App;
