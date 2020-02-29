var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config/config');
var routes = require('./routes/routes');
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "BillGenFrontend")))
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

app.use('/api', routes);
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "BillGenFrontend", "index.html"))
})

app.listen(PORT, () => {
    console.log("Sevrer started", PORT)
})