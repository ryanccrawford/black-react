const mongoose = require("mongoose")
const dbURL = process.env.MONGODB_URI || "mongodb://localhost/reactjack"
mongoose.connect(dbURL, { useNewUrlParser: true })
const db = require("../models")
const path = require("path")

module.exports = function (app) {

    app.get("/api/players", function (req, res) {

        db.Players.find({}).then(function (data) {
            res.json(data)
        }).catch(function (err) {
            res.json(err)
        })
       
    });

    app.post("/api/player", function (req, res) {
        //TODO get player 
        db.Players.find({}).then(function (data) {
            res.json(data)
        }).catch(function (err) {
            res.json(err)
        })

    });
   
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "./client/build/index.html"));
    });
}