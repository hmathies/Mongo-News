var db = require('../models');
var request = require('request');
var cheerio = require("cheerio");

module.exports = function(app) {

  /*===============================================================================================================
                   Scrape data from one site and place it into mongodb
  ================================================================================================================*/
  app.get("/scrape", function(req, res) {
    // Make a request from NPR.org
    // Make a request from NPR.org
    var articles = [];
    request("https://www.npr.org/sections/news/", function(error, response, html) {
      // Load the html body from request into cheerio
      var $ = cheerio.load(html);


      // For each loop through the element that has the title of the article
      $(".item-info").each(function(i, element) {

        var title = $(element).children("h2.title").text();
        var link = $(element).find('.title').children("a").attr("href");
        var summary = $(element).children("p.teaser").text();
        articles.push({
          title: title,
          link: link,
          summary: summary
        })

        console.log(articles);
        if (title && link && summary && false) {

          // Insert the data in the article db
          db.Article.create({
              title: title,
              url: link,
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
    res.json(articles);
  });



  /*===========================================================================================================
                    RETRIEVE DATA FROM THE DB AND DISPLAY ARTICLES IN THE BROWSER
  ============================================================================================================*/

  app.get("/article/:id", function(req, res) {

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

  app.get("/articles", function(req,res) {
    db.Article.find({}, function(err, articles){
      if (err){
        console.log(err);
      }else{
        res.json(articles);
      }
    });
  });

  app.post("/article", function(req, res){

    var article = new db.Article(req.body);
    db.Article.find({title: article.title, summary: article.summary}, function (error, docs){
      console.log(docs);
      console.log(article);
      if (error){
        console.log(error);
      }if (docs.length == 0){
        article.save(function(err, saved){
          res.json(saved);
        });
      }else {
        res.json(docs[0]);
      }
    })

  });
};
