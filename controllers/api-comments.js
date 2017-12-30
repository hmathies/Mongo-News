// *********************************************************************************
// COMMENT ROUTES FOR POST, GET, AND DELETE COMMENTS FROM THE DATABASE
// *********************************************************************************
// =============================================================
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require('request');
var path = require('path');

// Require all models
var db = require("../models");


module.exports = function(app) {

  /*==========================================================================================
          ROUTE TO INSERT A COMMENT INTO THE DB
  ===========================================================================================*/
  app.post("/addComment", function(req, res) {
    console.log('This is the req.body: ', req.body);
    // Insert the note into the comments collection
    var comment = new db.Comment(req.body);
    comment.save(function(error, saved) {
      // Log any errors
      if (error) {
        console.log('This is the insert error: ' + error);
      }
      // Otherwise, send the note back to the browser
      // This will fire off the success function of the ajax request
      else {
        db.Article.findById(req.body.article, function(err, article){
          if(err){
            console.log(err);
          }
          article.comments.push(saved._id);
          article.save(function(err, article){
          if (err){
            console.log(err);
          }
          res.json(saved);
        });

      });
      }
    });
  });

  /*==========================================================================================
          ROUTE TO GET ALL COMMENTS FROM THE DB
  ===========================================================================================*/
  app.get("/all", function(req, res) {
    // Find all comments in the comments collection

    db.Comment.find({}, function(error, comments) {
      // Log any errors
      if (error) {
        console.log("THIS IS THE ERROR FOR THE FIND FUNCTION: ", error);
      }
      // Otherwise, send json of the comments back to user
      // This will fire off the success function of the ajax request
      else {
        res.json(comments);
      }
    });
  });

  /*==========================================================================================
        Need to completely change this delete--- do the reverse of addComment
  ===========================================================================================*/
  app.delete("/delete/:id", function(req, res) {
    // Remove a note using the objectID
    db.Comment.findByIdAndRemove(req.params.id,
    function(error, removed) {
      // Log any errors
      if (error) {
        console.log(error);
        res.send(error);
      }

      // This will fire off the success function of the ajax request
      else {
        // var t = db.Article.update({}, {$pull:{comments:req.params.id}}, false, function(error, docs){
        //   if (error){
        //     console.log(error);
        //   }else {
        //     console.log(docs);
        //   }
        // });
        console.log(t);
        res.send(removed);
      }
    });
  });
}
