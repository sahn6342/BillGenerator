var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    ratePerBottle: {
        type: Number,
        required: true
    },
    rentPerDispenser: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('customer', customerSchema);