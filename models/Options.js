var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var OptionsSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    val: {
        type: String,
        required: true
    }
});

var Options = mongoose.model("Options", OptionsSchema);
module.exports = Options;
