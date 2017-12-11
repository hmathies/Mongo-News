$(() => {
  $("#addComment").click(() => {
    var comment = {
      name: $("#name").val().trim(),
      comment: $("#commentArea").val().trim()
    }
    console.log("clicked")
    postComment(comment)
  })
  getComments()
})

function addComments(comment) {
  $("#comments").append(`<h4> ${comment.name} </h4> <p> ${comment.commentArea} </p>`)
}

function getMessages() {
  $.get('http://localhost:3000/messages', (data) => {
    data.forEach(addComments)
  })
}

function postComment(comment) {
  $.post('http://localhost:3000/messages', comment)
}