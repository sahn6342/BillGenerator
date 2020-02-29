var express = require('express');
var router = express.Router();

var genData = require('./genricData');
router.post('/genricData', genData.addGenricData);
router.put('/genricData', genData.addGenricData);
router.get('/genricData', genData.getGenricData);

var customerCRUD = require('./customer/customer');
router.post('/customer', customerCRUD.addNewCustomer);
router.put('/customer', customerCRUD.updateCustomer);
router.get('/customers', customerCRUD.getCustomers);
router.get('/customer/:customerId', customerCRUD.getByIdCustomer);
router.post('/deleteCustomer', customerCRUD.deleteCustomer);

var invoiceCRUD = require('./invoice/invoice');
router.post('/invoices', invoiceCRUD.genrateMultipleBills)

module.exports = router;