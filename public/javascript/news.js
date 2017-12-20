$(function() {
  // Empty any Comments currently on the page
  $("#comments").empty();
  // creating a variable to hold the id of the article in place it in the url
  var id = location.href.substring(location.href.lastIndexOf('/') + 1);
  $.getJSON("/article/" + id, function(data) {
    $(".newsTitle").text(data.title);
    //the below line needs to change to have the entire article, not the summary
    $(".newsArticle").text(data.summary);
    for (var i = 0; i < data.fullComments.length; i++) {
      // ...populate #Comments with a p-tag that includes the comments's title and object id
      $("#comments").prepend("<p class='dataentry' data-id=" + data.fullComments[i]._id + "><span class='dataName' data-id=" +
        data.fullComments[i]._id + ">" + data.fullComments[i].name + "<br>" + data.fullComments[i].comment + "<br>" + "</span><span class=deleter>X</span></p>");
    }
  });

});
/*===============================================================================================
            ONCLICK FUNCTION IN BROWSER SO THAT USERS CAN POST COMMENTS TO THE PAGE
===============================================================================================*/
// When the #addComment button is clicked
$(document).on("click", "#addComment", function() {
  // AJAX POST call to the submit route on the server
  // This will take the data from the form and send it to the server

  $.ajax({
      type: "POST",
      dataType: "json",
      url: "/addComment",
      data: {
        name: $("#name").val(),
        comment: $("#comment").val().trim(),
        article: location.href.substring(location.href.lastIndexOf('/') + 1)
      }
    })
    // If that API call succeeds, add the title and a delete button for the note to the page
    .done(function(data) {
      // Add the message and delete button to the #Comments section
      $("#comments").prepend("<p class='dataentry' data-id=" + data._id + "><span class='dataName' data-id=" +
        data._id + ">" + data[i].name + "/n'" + data[i].message + "</span><span class=deleter>X</span></p>");
      // Clear the note and title inputs on the page
      $("#name").val("");
      $("#comment").val("");
    });
});
/*===============================================================================================
            FUNCTION IN BROWSER SO THAT USERS CAN DELETE A COMMENT
===============================================================================================*/
// When user clicks the deleter button for a note
$(document).on("click", ".deleter", function() {
  // Save the p tag that encloses the button
  var selected = $(this).parent();
  // Make an AJAX GET request to delete the specific note
  // this uses the data-id of the p-tag, which is linked to the specific note
  $.ajax({
    type: "GET",
    url: "/all" + selected.attr("data-id"),

    // On successful call
    success: function(response) {
      // Remove the p-tag from the DOM
      selected.remove();
      // Clear the note and title inputs
      $("#name").val("");
      $("#comment").val("");
      // Make sure the #actionbutton is submit (in case it's update)
      $("#addComment").html("<button id='addComment'>Add Comment</button>");
    }
  });
});
