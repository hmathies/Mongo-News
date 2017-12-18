$(function() {

  $("#scrapeButton").click(function(e) {
    e.preventDefault();
    console.log("Scraped button has been clicked");
    //click event for Scraping
    displayScrapes();
  });

  function displayScrapes(articles) {

    // Empty any Articles currently on the page
    // $("#scrapes").empty();

    $.ajax({
      url: 'https://www.npr.org/sections/news/',
      dataType: '',
      data: {},
      success: function(html) {
        var $html = $(html);

        $html.find(".item-info").each(function(i, element) {
          var title = $(element).children("h2.title").text();
          var url = $(element).find('.title').children("a").attr("href");
          var summary = $(element).children("p.teaser").text();

          $("#scrapes").append("<h4>" + title + "</h4>" + "<br>" +
            "<p>" + summary + "</p>" + "<br>" +
            "<a href>" + url + "<a href>" + "<hr>");

        });
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
