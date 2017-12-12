var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  //title is required and of type String
  title: {
    type: String,
    required: true
  },
  //summary is required and of type String
  summary: {
    type: String,
    required: true
  },
  //link is required and of type String
  url: {
    type: String,
    required: true
  },
  // `comment` is an object that stores a Comment id
  // The ref property links the ObjectId to the Comment model
  // This allows me to populate the Article with an associated Comment
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

// This creates the model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Book model
module.exports = Article;