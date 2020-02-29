var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var invoiceSchema = new Schema({
    invoiceNo: {
        type: Number,
        required: true,
        unique: true
    },
    customerId: {
        type: String,
        required: true
    },
    billingMonth: {
        type: String,
        required: true
    },
    components: {
        type: []
    },
    totalAmount: {
        type: Number
    }
});

module.exports = mongoose.model('invoice', invoiceSchema);