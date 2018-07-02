// call installed modules and assign them to variable express and bodyParser
var express = require("express");
var bodyParser = require("body-parser");

// list of api divided by their function
var foodRouter = require("./routes/food");
var orderRouter = require("./routes/order")

var app = express();

// tell express to accept both JSON and url encoded values
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add headers to make api can run
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// assign api list to api path
app.use('/food', foodRouter)
app.use('/order', orderRouter)

// define the port where server should be running on
var server = app.listen(process.env.PORT || 3000, function () {
    console.log("app running on port.", server.address().port);
});