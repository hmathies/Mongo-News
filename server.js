var express = require('express');
var bodyParser = require("body-parser");
var exphbs = require('express-handlebars');
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require('request');
var port = process.env.PORT || 3000;
var app = express();



// Static directory
app.use('/public', express.static("public"));

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


//import routes and give server access to them
//api routes must come above html routes
require("./controllers/api.js")(app);
//html routes
require("./controllers/main.js")(app);



app.listen(port, function() {
  console.log("Listening on Mongo Port %s", port);

});