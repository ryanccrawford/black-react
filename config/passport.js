require('dotenv').config();
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const dbURL = process.env.MONGODB_URI || "mongodb://localhost/reactjack";
mongoose.connect(dbURL, { useNewUrlParser: true });
const db = require("../models");
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECERET_OR_KEY;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            db.Players.findById(jwt_payload.id)
                .then(player => {
                    if (player) {
                        return done(null, player);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};