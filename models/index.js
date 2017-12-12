// Exporting an object containing both models

module.exports = {
  Comment: require("./Article"),
  Article: require("./Comment")
};