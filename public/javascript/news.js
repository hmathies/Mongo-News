$(function() {


  //click event for caputuring user and comment input
  $("#addComment").click(function(e) {
    e.preventDefault();
    var userComment = {
      name: $("#name").val().trim(),
      comment: $("#commentArea").val().trim()
    }
    console.log("This user posted: ", userComment);
    addComment(userComment);
  })
  //dynamically display user name and comment to the page
  function addComment(userComment) {
    $("#comments").append(`<h6> ${userComment.name} </h6> <p> ${userComment.comment} </p>`)
  }
  //click event to delete a comment--will need to change to delete only one comment
  $("#deleteComment").click(function(e) {
    e.preventDefault();
    console.log("delete button has been clicked");
    $("#comments").html("");
  })
  //===========================================================
  //onclick to go back to index page
  //==============================================================
  $("#homeButton").click(function(e) {
    e.preventDefault();
    console.log("Home page button clicked");
    location.href = "/";
  });

  //~closing tags for document on ready function are below
})