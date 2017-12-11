// *********************************************************************************
// HTML ROUTES: ROUTES FOR SENDING USERS TO THE  HTML PAGES
// *********************************************************************************
// Dependencies
// =============================================================
var path = require("path");
// Routes
// =============================================================
module.exports = function(app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  app.get('/', function(req, res) {
    res.render('index');
  });
  app.get('/news', function(req, res) {
    res.render('news');
  });
}
// *********************************************************************************
//                                END OF FILE
// *********************************************************************************