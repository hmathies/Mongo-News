var express = require('express');
var bodyParser = require("body-parser");
var exphbs = require('express-handlebars');
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require('request');
var path = require('path');


//will need to change this for production
var port = process.env.PORT || 3000;
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//initialize express
var app = express();

// Require all models
var db = require("./models");


// Configure middleware

// Serves the public folder as a Static directory
app.use('/public', express.static("public"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
  extended: false
}));

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/mongoNews", {
  useMongoClient: true,
});
var dbConn = mongoose.connection;

//check connection
dbConn.once('open', function() {
  console.log('Connected to MongoDB');
});

//check for DB errors
dbConn.on('error', function(err) {
  console.log('Error is coming from DB in Server.js file: ', err);
});


//import routes and give server access to them
//api routes must come above html routes
require("./controllers/api.js")(app);
//html routes
require("./controllers/html.js")(app);

//Start the server
app.listen(port, function() {
  console.log("Listening on Mongo Port %s", port);

});