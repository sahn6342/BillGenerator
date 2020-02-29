var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var masterCollection = new Schema({

    distributorName: {
        type: String
    },
    distributorMobileNo: [{
        type: Number
    }],
    distributorAddress: {
        type: String
    },
    distributorEmailAddress: {
        type: String
    },
    bank: [
        {
            ReciverName: {
                type: String
            },
            BankName: {
                type: String
            },
            BankAccountNumber: {
                type: String
            },
            BankReciverIfscCode: {
                type: String
            }
        }
    ],
    distributorTermsAndConditions: [{
        type: String
    }],
    distributorPaymentWithInDays: {
        type: Number
    },
    distributorPaymentAccepted: [{
        type: String
    }]

});
module.exports = mongoose.model('masterCollection', masterCollection);