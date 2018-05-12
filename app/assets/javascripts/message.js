$(function() {
  function buildHTML(message){
    var html = `<h2 class = chat__content1__name>
                    ${message.user_name}</h2>
                <p class = chat__content1__date>
                ${message.created_at}</p>`
  }
  $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.chat_content').append(html)
      })
  });
});
