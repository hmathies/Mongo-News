// *********************************************************************************
// COMMENT ROUTES FOR POST, GET, AND DELETE COMMENTS FROM THE DATABASE
// *********************************************************************************
// Dependencies--not sure if i need to include these since they are already listed in server.js
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
        res.json(saved);
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
          ROUTE TO DELETE A COMMENT FROM THE DB
  ===========================================================================================*/
  app.get("/delete/:id", function(req, res) {
    // Remove a note using the objectID
    db.comments.remove({
      "_id": ObjectID(req.params.id)
    }, function(error, removed) {
      // Log any errors
      if (error) {
        console.log(error);
        res.send(error);
      }

      // This will fire off the success function of the ajax request
      else {
        console.log(removed);
        res.send(removed);
      }
    });
  });
}