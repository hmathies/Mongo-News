//COMMENT model which defines the user and their associated comments
var mongoose = require("mongoose");
// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  //this is the person typing the comment and must be a string
  name: String,
  comment: String
});

// This creates the model from the above schema, using mongoose's model method
var Comment = mongoose.model("comment", CommentSchema);

// Export the Book model
module.exports = Comment;