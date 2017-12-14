// Loads Comments onto the page
function getComments() {
  // Empty any Comments currently on the page
  $("#comments").empty();
  // Grab all of the current notes
  $.getJSON("/all", function(data) {
    // For each note...
    for (var i = 0; i < data.length; i++) {
      // ...populate #Comments with a p-tag that includes the note's title and object id
      $("#comments").prepend("<p class='dataentry' data-id=" + data[i]._id + "><span class='dataName' data-id=" +
        data[i]._id + ">" + data[i].name + "/n'" + data[i].comment + "</span><span class=deleter>X</span></p>");
    }
  });
}

// Runs the getComments function as soon as the script is executed
getComments();

// When the #makenew button is clicked
$(document).on("click", "#addComment", function() {
  // AJAX POST call to the submit route on the server
  // This will take the data from the form and send it to the server
  $.ajax({
      type: "POST",
      dataType: "json",
      url: "/addComment",
      data: {
        name: $("#name").val(),
        comment: $("#comment").val().trim()
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