$(function(){

  $.getJSON("/articles", function(data){
    var savedArticles = $("#savedArticles div");
    for (var i in data){
    savedArticles.append("<div class='savedArticle'><h4><a href='/news/" + data[i]._id + "'>" + data[i].title +
                                      "</a></h4><p>"+ data[i].summary +
                                      "</p><p><a href='" + data[i].url +
                                      "'>" + data[i].url + "</a></p></div>");
    }
  });
});
