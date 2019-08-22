require('dotenv').config();
const mongoose = require("mongoose");
const dbURL = process.env.MONGODB_URI || "mongodb://localhost/reactjack";
mongoose.connect(dbURL, { useNewUrlParser: true });
const db = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../../validation/registerValidation");
const validateLoginInput = require("../../validation/loginValidation");
const path = require("path");

module.exports = function (app) {

    app.post("/api/register", (req, res) => {
        // Form validation
        const { errors, isValid } = validateRegisterInput(req.body);
        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        db.Players.findOne({ email: req.body.email }).then(player => {
            if (player) {
                return res.status(400).json({ email: "Email already exists" });
            } else {
                const newPlayer = new db.Players({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    bankRoll: 10000,
                    cards: [],
                    table: null
                });
                // Hash password before saving in database
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newPlayer.password, salt, (err, hash) => {
                        if (err) throw err;
                        newPlayer.password = hash;
                        newPlayer
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    });

    app.post("/api/login", (req, res) => {

        const { errors, isValid } = validateLoginInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }
        const email = req.body.email;
        const password = req.body.password;

        db.Players.findOne({ email }).then(player => {

            if (!player) {
                return res.status(404).json({ error: "Email or Password incorrect" });
            }

            bcrypt.compare(password, player.password).then(isMatch => {
                if (isMatch) {
                    return res.json({ id: player._id, name: player.name, email: player.email, bankRoll: player.bankRoll });

                } else {
                    return res
                        .status(400)
                        .json({ error: "Password or Email incorrect" });
                }
            });
        });
    });

    app.post("/api/players", function (req, res) {

        db.Players
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    });

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../client/build/index.html"));
    });

};
