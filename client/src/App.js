import React from 'react';
//import ReactDOM from "react-dom";
import GameTable from './Pages/GameTable'
import useLocalStorage from 'react-use-localstorage';
import './App.css';


function App() {

    const [deckId, setDeck] = useLocalStorage("deckId", "");
   
    
    return (
            <div className="App">
            <GameTable 
                deckId={deckId}
                setDeck={setDeck}
            >
            </GameTable>
            </div>
        )
}

export default App;