var db = require('../models');

module.exports = function(app) {

  /*===============================================================================================================
                   Scrape data from one site and place it into mongodb
  ================================================================================================================*/
  app.get("/scrape", function(req, res) {
    // Make a request from NPR.org
    request("https://www.npr.org/sections/news/", function(error, response, html) {
      // Load the html body from request into cheerio
      var $ = cheerio.load(html);
      // For each loop through the element that has the title of the article
      $(".title").each(function(i, element) {
        /*=================================================================================
         Save the title,href, and summary of each article enclosed in the current element
                   title: h2.title;
                   link: both the title and summary are an a.href;
                   summary: p.teaser
        ==================================================================================*/
        var title = $(element).children("??").text();
        var link = $(element).children("??").attr("href");
        var summary = $(element).children().text();

        // If this found element had a title, summary and a link
        if (title && link && summary) {
          // Insert the data in the article db
          db.Article.create({
              title: title,
              link: link,
              summary: summary
            },
            function(err, inserted) {
              if (err) {
                // Log the error if one is encountered during the query
                console.log(err);
              } else {
                // Otherwise, log the inserted data
                console.log(inserted);
              }
            });
        }
      });
    });

    // Send a "Scrape Complete" message to the browser
    res.send("Scrape Complete");
  });
  /*===========================================================================================================
                    RETRIEVE DATA FROM THE DB AND DISPLAY ARTICLES IN THE BROWSER
  ============================================================================================================*/

  app.get("/article/:id", function(req, res) {
    // Find all results from the articles collection in the db
    db.Article.findOne({
      _id: req.params.id
    }, function(error, found) {
      // Throw any errors to the console
      if (error) {
        console.log(error);
      }
      // If there are no errors, send the data to the browser as json
      else {
        db.Comment.find({
          _id: {
            $in: found.comments
          }
        }, function(error, comments) {
          found.fullComments = comments;
          console.log(comments);
          res.json(found);
        });
      }
    });
  });
};