var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./api/config/config');
var routes = require('./api/routes/routes');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.port || config.port;

mongoose.set('useFindAndModify', false);

mongoose.connect(config.mongo, { useNewUrlParser: true, useUnifiedTopology: true }, (err, data) => {
    if (err) {
        console.error("Database not connected..", err);
    }
    else {
        console.log("Database connected");
    }
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use('/user', routes);

app.listen(PORT, () => {
    console.log("Sevrer started", PORT)
})