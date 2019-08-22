import React from 'react';

import { BrowserRouter as Router, Switch, Route,  withRouter } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ReactFontFace from 'react-font-face'
import CasinoFont from '../Fonts/main.ttf'
import Signup from '../Signup'
import Signin from '../Signin'

import './welcome.css';                                                                                                                                                                                                                                                                                                                                                                                                                         import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright '}
      <Link color="inherit" href="/">
        React BackJack version 2019
      </Link>{' '}
      {new Date().getFullYear()}
      {'. By '}
      <Link color="inherit" href="https://ryancrawford.me/">
        Ryan Crawford
      </Link>
    </Typography>
  );
}
const useStyles = makeStyles(theme => ({
    icon: {
        height: "32px",
        margin: "8px 8px 8px 8px !important",
        padding: "8px 8px 8px 8px !important",
        float: "left",
        filter: "drop-shadow(2px 2px 10px black)"
    },
    icon2: {
        height: "32px",
        margin: "8px 8px 8px 8px !important",
        padding: "8px 8px 8px 8px !important",
        float: "left",
        filter: "drop-shadow(2px 2px 10px white)"
    },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 8),

  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0),
    },
    CasinoFont: {
        margin: 15,
        fontSize: 20,
        lineHeight: 1.4,
        fontFamily: 'Casino Queen',
    }
}));

function Welcome(props){


     const classes = useStyles();


    return (
             <React.Fragment>
                 <CssBaseline />
            <AppBar position="relative" >
                <Toolbar className={classes.icon}>
                    <img className={classes.icon2} src="/images/spade.png" alt="..." />
                         <h6 className={classes.CasinoFont}>
                        React BlackJack v2019
          </h6>
                     </Toolbar>

                 </AppBar>
                 <main>
                     {/* Hero unit */}
                     <div className="welcome">
                         <div className={classes.heroContent}>
                             <Container maxWidth="sm">
                                 <h1 className={classes.CasinoFont}>
                                     React BlackJack v2019
                                 </h1>
                                 <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                     Live Multiplayer BlackJack
            </Typography>
                                 <Box className={classes.heroButtons}>
                                     <Grid container spacing={2} justify="center">
                                        <Grid item>

                                        <Button id="play" variant="contained" onClick={props.clickEventHandle} color="primary">
                                                 Play Now!
                  </Button>
                                         </Grid>
                                             <Grid item>
                                        <Button id="create" variant="outlined" onClick={props.clickEventHandle} color="primary">
                                                     Create Account
                  </Button>
                                             </Grid>
                                     </Grid>
                               </Box>
                             </Container>

                         </div>

                     </div>
                {props.signin ? (<Signin />) : (null)}
                     {props.signup ? (<Signup/>): (null)}
                     <Container className={classes.cardGrid} maxWidth="md">
                         {/* End hero unit */}

                     </Container>
                 </main>
                 {/* Footer */}
                 <footer className={classes.footer}>
                     <Typography variant="h6" align="center" gutterBottom>

                     </Typography>
                     <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                         Please read our terms of service and about how we protect your information
        </Typography>
                     <Copyright />
                 </footer>
                 {/* End footer */}
             </React.Fragment>
         );

}


let fontConfig = {
    file: [
        {
            fontFamily: 'Casino Queen',
            fontStyle: 'normal',
            file: CasinoFont,
            fontType: 'truetype',
            fileLocal: 'Casino Queen Normal'
        }
    ]
}

export default ReactFontFace(Welcome, fontConfig)