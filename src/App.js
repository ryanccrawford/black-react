import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import PlayerHand from './components/PlayerHand';
import './App.css';


function App() {
  return (
      <div className="App">
          <CssBaseline />
          <Container maxWidth="lg">
              <header className="App-header">
              </header>
              <PlayerHand/>
          </Container>
    </div>
  );
}

export default App;
