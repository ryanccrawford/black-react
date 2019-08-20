import React, { Component } from 'react';
import Home from './components/pages/Home'
const auth = localStorage.getItem('jwtToken');

class App extends Component {


    render() {

        return (
            <div>
                <Home/>
            </div>
        );
    }
}

export default App;
