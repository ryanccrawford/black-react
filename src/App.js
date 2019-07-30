import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import PlayerHand from './components/PlayerHand';
import TopBar from './components/TopBar';



function App() {
  return (
      <div>
          <CssBaseline />
          <Container maxWidth="lg">
              <TopBar>
              </TopBar>
              <Container>
              <PlayerHand/>
              </Container>
              </Container>
    </div>
  );
}

export default App;
