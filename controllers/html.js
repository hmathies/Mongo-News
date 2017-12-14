// *********************************************************************************
// HTML ROUTES: ROUTES FOR SENDING USERS TO THE  HTML PAGES
// *********************************************************************************
// Dependencies
// =============================================================
var path = require("path");

// Require all models
var db = require("../models");
// Routes
// =============================================================
module.exports = function(app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  app.get('/news/:id', function(req, res) {
    res.render('news');
  });
  app.get('/', function(req, res) {
    res.render('index');
  });
}
// *********************************************************************************
//                                END OF FILE
// *********************************************************************************