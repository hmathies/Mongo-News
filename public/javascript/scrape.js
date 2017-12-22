$(function() {

  $("#scrapeButton").click(function(e) {
    e.preventDefault();
    console.log("Scraped button has been clicked");
    //click event for Scraping
    displayScrapes();
  });

  function displayScrapes(articles) {

    // Empty any Articles currently on the page
    $("#scrapes").empty();
    //sometimes the scrape works and sometimes it doesn't because of NPR's website causing a cross-site error
    $.ajax({
      // url: 'https://www.npr.org/sections/news/',
      url: "/public/sampleArticle.html",
      dataType: 'html',
      data: {},
      success: function(html) {
        var $html = $(html);

        $html.find(".item-info").each(function(i, element) {
          var title = $(element).children("h2.title").text();
          var url = $(element).find('.title').children("a").attr("href");
          var summary = $(element).children("p.teaser").text();

          $("#scrapes").append("<div id='scrapeArticle"+ i + "'><h4>" + title + "</h4>" +
            "<p>" + summary + "</p>" +
            "<p><a href='" + url + "'>" + "Click here to read the full article" + "</a></p>" +
            "<button class='scrapeSave' data-id='" + i + "'>Save</button></div>");

        });

        //try to make screen refresh with newly saved articles
        $(".scrapeSave").click(function(){
          var id = "#scrapeArticle" + $(this).data("id");
          var article = {
            title: $(id + " h4").text(),
            summary: $(id + " p").first().text(),
            url: $(id + " a").text()
          };
          $.post("/article", article, function(res){
            if(res._id){
              $(id).remove();
              alert("Article Saved!");
            }else {
              alert("Article didn't save!");
            }
          })
        })
      }
    });
    //once the button is clicked, the app will scrape npr and then list 10 headlines, with associated -
    //summaries and links

  };

  // ask the back end for json with all scraped articles
  $.getJSON("/scraper", function(data) {
    // Call our function to generate a table body
    displayScrapes(data);
  });

  //closing tags for document on ready function below
});
