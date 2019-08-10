var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PlayersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    money: {
        type: Number,
        required: true,
        default: 10000.00
    },
    date: {
        type: Date,
        default: Date.now
    }

});

var Players = mongoose.model("Players", PlayersSchema);
module.exports = Players;
