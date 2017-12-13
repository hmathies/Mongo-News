$(() => {

      getComments();
      //click event for caputuring user and comment input
      $("#addComment").click((e) => {
          e.preventDefault();
          var userComment = {
            name: $("#name").val().trim(),
            comment: $("#commentArea").val().trim()


            console.log("This user posted: ", userComment);
            addComment(userComment);
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