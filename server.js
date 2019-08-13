require('dotenv').config();
const express = require("express");
const session = require('express-session')
const logger = require("morgan");
const PORT = process.env.PORT || 3001;
const app = express();
const passport = require("passport");

// Define middleware here
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//CORS middleware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//sessions
app.use(
    session({
        secret: process.env.SECERET_TO_SESSIONS,
        resave: false,
        saveUninitialized: false
    })

);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}



// Passport config
require("./config/passport")(passport);

// Routes
require("./routes/api/apiRoutes")(app);


app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});


module.exports = app;