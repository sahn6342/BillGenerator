var dbGenric = require('../models/masterCollectionModel');

exports.addGenricData = (req, res) => {
    dbGenric.findOne({ distributorName: 'sandeep enterprises' }, (err, data) => {
        if (err) {
            res.json({
                success: false,
                msg: "Error while finding distributorName"
            })
        } else if (!data || data == null) {
            console.log(req)
            new dbGenric({
                distributorName: req.body.distributorName,
                distributorMobileNo: req.body.distributorMobileNo,
                distributorAddress: req.body.distributorAddress,
                distributorEmailAddress: req.body.distributorEmailAddress,
                bank: req.body.bank,
                distributorTermsAndConditions: req.body.distributorTermsAndConditions,
                distributorPaymentWithInDays: req.body.distributorPaymentWithInDays,
                distributorPaymentAccepted: req.body.distributorPaymentAccepted

            }).save((error, resData) => {

                if (error) {
                    res.json({
                        success: false,
                        msg: "Error while saving",
                        error
                    })
                } else {
                    res.json({
                        success: true,
                        msg: "Data successfully inserted",
                        data: resData
                    })
                }
            })
        } else {

            res.json({
                success: false,
                msg: "Data already present",
                data
            })
        }
    })
}

exports.getGenricData = (req, res) => {
    dbGenric.find((err, data) => {
        if (err) {
            res.json({
                success: false,
                message: "Error while fetching genric data",
                error: err
            })
        } else {
            res.json({
                success: true,
                message: "Genric data fetched successfully",
                data
            })
        }
    });
}