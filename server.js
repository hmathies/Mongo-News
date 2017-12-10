var express = require('express');
var bodyParser = require("body-parser");
var exphbs = require('express-handlebars');
var port = process.env.PORT || 3000;
var app = express();

var express = require('express');
var exphbs = require('express-handlebars');

var app = express();



app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
//
//import routes and give server access to them
// var routes = require("./controllers/news.js");

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(port, function() {
  console.log("Listening on Mongo Port %s", port);

});