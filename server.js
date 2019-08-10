const express = require("express");
const logger = require("morgan");
const PORT = process.env.PORT || 3001;
const app = express();
const passport = require("passport");

// Define middleware here
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

require("./routes/api/playersRoutes")(app);
require("./routes/api/apiRoutes")(app);


app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});


module.exports = app;