var express = require('express');
var bodyParser = require("body-parser");
var exphbs = require('express-handlebars');
var port = process.env.PORT || 3000;
var app = express();

var express = require('express');
var exphbs = require('express-handlebars');

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