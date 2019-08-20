import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Home from './components/pages/Home'
const auth = localStorage.getItem('jwtToken');

const theme = createMuiTheme({
    palette: {
        primary: { main: "#424242" },
        secondary: { main: "#034008" }
    },
});


class App extends Component {


    render() {

        return (
            <ThemeProvider theme={theme}>
                <Home/>
            </ThemeProvider>
        );
    }
}

export default App;
