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