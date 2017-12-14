$(function() {
  // Empty any Comments currently on the page
  $("#comments").empty();
  // Grab all of the current notes
  var id = location.href.substring(location.href.lastIndexOf('/') + 1);
  $.getJSON("/article/" + id, function(data) {
    $(".newsTitle").text(data.title);
    $(".newsArticle").text(data.summary);
    for (var i = 0; i < data.fullComments.length; i++) {
      // ...populate #Comments with a p-tag that includes the note's title and object id
      $("#comments").prepend("<p class='dataentry' data-id=" + data.fullComments[i]._id + "><span class='dataName' data-id=" +
        data.fullComments[i]._id + ">" + data.fullComments[i].name + "<br>" + data.fullComments[i].comment + "</span><span class=deleter>X</span></p>");
    }
  });
});