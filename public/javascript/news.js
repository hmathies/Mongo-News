$(() => {
  //click event for caputuring user and comment input
  $("#addComment").click((e) => {
    e.preventDefault();
    var userComment = {
      name: $("#name").val().trim(),
      comment: $("#commentArea").val().trim()
    }
    console.log("This user posted: ", userComment)

  })
  // getComments()
  // function addComments(comment) {
  //   $("#comments").append(`<h4> ${comment.name} </h4> <p> ${comment.commentArea} </p>`)
  // }
  //
  // function getMessages() {
  //   $.get('http://localhost:3000/messages', (data) => {
  //     data.forEach(addComments)
  //   })
  // }
  //click event for Scraping




  //~closing tags for document on ready function are below
})