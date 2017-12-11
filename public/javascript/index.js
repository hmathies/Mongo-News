$(() => {
  $("#addComment").click(() => {
    var comment = {
      name: $("#name").val(),
      comment: $("#commentArea").val()
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

function postComments(comment) {
  $.post('http://localhost:3000/messages', comment)
}