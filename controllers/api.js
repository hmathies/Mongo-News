// *********************************************************************************
// API ROUTES: ROUTES FOR SENDING DATA TO AND FROM THE DATABASE
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

  //===========comments routes=====================

  // Handle form submission, save submission to mongo
  app.post("/addComment", function(req, res) {
    console.log('This is the req.body: ', req.body);
    // Insert the note into the comments collection
    db.comments.insert(req.body, function(error, saved) {
      // Log any errors
      if (error) {
        console.log('This is the insert error: ', error);
      }
      // Otherwise, send the note back to the browser
      // This will fire off the success function of the ajax request
      else {
        res.send(saved);
      }
    });
  });

  // Retrieve results from mongo
  app.get("/all", function(req, res) {
    // Find all comments in the comments collection

    db.comment.find({}, function(error, comments) {
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
}

// Scrape data from one site and place it into the mongodb db
// app.get("/scrape", function(req, res) {
//       // Make a request frm NPR.org
//       request("https://www.npr.org/sections/news/", function(error, response, html) {
//         // Load the html body from request into cheerio
//         var $ = cheerio.load(html);
//         // For each loop through the element that has the title of the article
//         $("????").each(function(i, element) {
//           // Save the title, summary and href of each link enclosed in the current element
//           var title = $(element).children("a").text();
//           var link = $(element).children("a").attr("href");
//
//           // If this found element had a title, summary and a link
//           if (title && link) {
//             // Insert the data in the article db
//             db.article.create({
//                 title: title,
//                 link: link,
//                 summary: summary
//               },
//               function(err, inserted) {
//                 if (err) {
//                   // Log the error if one is encountered during the query
//                   console.log(err);
//                 } else {
//                   // Otherwise, log the inserted data
//                   console.log(inserted);
//                 }
//               });
//           }
//         });
//       });