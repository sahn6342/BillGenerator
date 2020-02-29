var invoiceModel = require('../../models/invoiceModel');
var customerModel = require('../../models/customerModel');
var _ = require('lodash');

var lastInvoiceId = 0;
exports.saveInvoices = (req, res) => {
    new invoiceModel({
        invoiceNo: req.invoiceNo,
        customerId: req.customerId,
        // startDate: req.startDate,
        // endDate: req.endDate,
        billingMonth: req.billingMonth,
        items: req.items,
        totalAmount: req.totalAmount,
        createdOn: +new Date,
        updatedOn: +new Date
    }).save((error, Data) => {
        if (error) {
            return {
                success: false,
                message: 'Error while saving invoice in database.',
                error
            }
        }
        else {
            return {
                success: true,
                message: 'Invoice saved successfully.',
                Data
            }
        }
    })
}

saveMultipleInvoice = (req, res) => {
    new invoiceModel({
        invoiceNo: req.invoiceNo,
        customerId: req.customerId,
        startDate: req.startDate,
        endDate: req.endDate,
        items: req.items,
        totalAmount: req.totalAmount,
        createdOn: +new Date,
        updatedOn: +new Date
    }).save((error, Data) => {
        if (error) {
            res.json({
                success: false,
                message: 'Error while saving invoice in database.',
                error
            })
        }
        else {
            res.json({
                success: true,
                message: 'Invoice saved successfully.',
                Data
            })
        }
    })
}

exports.genrateMultipleBills = (req, res) => {
    const reqBody = _.cloneDeep(req.body);
    const billingMonth = reqBody.billingMonth;

    if (reqBody.customers) {
        // To get last invoice id
        invoiceModel.find().sort({ invoiceNo: 1 }).then((data) => {
            lastInvoiceId = 0;
            if (data && data.length) {
                lastInvoiceId = data[data.length - 1].invoiceNo;
            }
            //  To get those customers list whose id is in requestes list
            let customerIdList = _.map(reqBody.customers, x => x.customerId);
            customerModel.find({ _id: { $in: customerIdList } }).then(customers => {
                let invoiceList = genrateInvoiceList(billingMonth, customers, reqBody.customers);
                invoiceModel.insertMany(invoiceList).then((recentlyAddedInvoices) => {
                    lastInvoiceId = recentlyAddedInvoices ? recentlyAddedInvoices[recentlyAddedInvoices.length - 1].invoiceNo : 0;
                    res.json({
                        success: true,
                        data: recentlyAddedInvoices,
                        message: 'Invoice saved successfully.',
                    })
                })
            });
        });
    }
}

function genrateInvoiceList(billingMonth, dbCustomers, reqCustomers) {
    let invoiceList = [];
    dbCustomers.forEach(customerDbObj => {
        let customerReqObj = _.find(reqCustomers, x => x.customerId == customerDbObj._id);
        invoiceList.push(genrateInvoiceObject(customerDbObj, customerReqObj, billingMonth));
    });
    return invoiceList;
}

function genrateInvoiceObject(customerDbObj, customerReqObj, billingMonth) {
    var components = [];
    if (customerReqObj.bottleConsumption) {
        const component = {
            description: '20L Water Bottle',
            noOfConsumedBottles: customerReqObj.bottleConsumption,
            ratePerBottle: customerDbObj.ratePerBottle,
            total: (+customerReqObj.bottleConsumption * +customerDbObj.ratePerBottle)
        }
        components.push(component);
    }
    if (customerReqObj.noOfDispenser) {
        const component = {
            description: 'Water dispenser',
            noOfDispenser: customerReqObj.noOfDispenser,
            rentPerDispenser: customerDbObj.rentPerDispenser,
            total: (+customerReqObj.noOfDispenser * +customerDbObj.rentPerDispenser)
        }
        components.push(component);
    }

    var totalAmount = 0;
    if (components.length) {
        components.forEach((component) => {
            totalAmount += component.total;
        })
    }
    var invoice = {
        invoiceNo: ++lastInvoiceId,
        customerId: customerReqObj.customerId,
        components,
        billingMonth,
        totalAmount
    }
    return invoice;
}