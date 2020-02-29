var customerModel = require('../../models/customerModel');

exports.addNewCustomer = (req, res) => {
    new customerModel({
        name: req.body.name,
        address: req.body.address,
        ratePerBottle: req.body.ratePerBottle,
        rentPerDispenser: req.body.rentPerDispenser
    }).save((err, data) => {
        if (err) {
            res.json({
                success: false,
                message: "Error while saving new customer.",
                error: err
            })
        } else {
            res.json({
                success: true,
                message: "New customer added successfully.",
                data
            })
        }
    })
};

exports.updateCustomer = (req, res) => {
    if (req.body._id) {
        customerModel.findOneAndUpdate({ _id: req.body._id }, {
            $set: {
                name: req.body.name, address: req.body.address, ratePerBottle: req.body.ratePerBottle, rentPerDispenser: req.body.rentPerDispenser
            }
        }, (err, data) => {
            if (err) {
                res.json({
                    success: false,
                    msg: "error in updating",
                    error: err
                })
            }
            else {
                res.json({
                    success: true,
                    message: "Customer edited successfully.",
                    data
                })
            }
        });
    }
}

exports.getCustomers = (req, res) => {
    customerModel.find((err, data) => {
        if (err) {
            res.json({
                success: false,
                message: "Error while fetching customer",
                error: err
            })
        } else {
            res.json({
                success: true,
                message: "Customers fetched successfully",
                data
            })
        }
    });
}

exports.getByIdCustomer = (req, res) => {

    console.log(req.params.customerId)
    customerModel.findById(req.params.customerId).then(customer => {
        if (!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        res.send(customer);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        return res.status(500).send({
            message: "Error retrieving customer with id " + req.params.customerId
        });
    });;
}

exports.deleteCustomer = (req, res) => {
    customerModel.deleteOne({ _id: req.body.id }, (err) => {
        if (err) {
            res.json({
                success: false,
                message: "Error while delete customer",
                error: err
            })
        }
        else {
            res.json({
                success: true,
                message: "Successfully deleted"
            })
        }
    });
}