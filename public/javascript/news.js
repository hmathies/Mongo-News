$(() => {

  // Loads results onto the page
  function getComments() {

    // Grab all of the comments
    $.getJSON("/news", function(data) {
      // For each comment...
      for (var i = 0; i < data.length; i++) {
        // ...populate #comments with a p-tag that includes the comments's author and a delete button
        $("#comments").append("<h6 class='dataentry' data-id=" + data[i]._id + "><span class='newsTitle' data-id=" +
          data[i]._id + ">" + data[i].title + "</span><span class=deleter>X</span></p>");
      }
    });
  }

  getComments();
  //click event for caputuring user and comment input
  $("#addComment").click((e) => {
    e.preventDefault();
    // var userComment = {
    //   name: $("#name").val().trim(),
    //   comment: $("#commentArea").val().trim()

    // AJAX POST call to the submit route on the server
    // This will take the data from the form and send it to the server
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/addComment",
      data: {
        name: $("#name").val().trim(),
        comment: $("#commentArea").val().trim()
      }
    })

    console.log("This user posted: ", data.name);
    addComment(data);
  })
  //dynamically display user name and comment to the page
  function addComment(data) {
    $("#comments").append(`<h6> ${data.name} </h6> <p> ${data.comment} </p>`)
  }
  //click event to delete a comment--will need to change to delete only one comment
  $("#deleteComment").click((e) => {
    e.preventDefault();
    console.log("delete button has been clicked");
    $("#comments").html("");
  })
  //===========================================================
  //onclick to go back to index page
  //==============================================================
  $("#homeButton").click((e) => {
    e.preventDefault();
    console.log("Home page button clicked");
    location.href = "/";
  });

  //~closing tags for document on ready function are below
})