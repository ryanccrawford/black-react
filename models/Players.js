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
    bankRoll: {
        type: Number,
        required: true,
        default: 10000.00
    },
    cards: {
        type: Array,
        required: false,
        default: []
    },
    table: {
        type: Array,
        required: false,
        default: []
    },
    date: {
        type: Date,
        default: Date.now
    }

});

var Players = mongoose.model("Players", PlayersSchema);
module.exports = Players;
