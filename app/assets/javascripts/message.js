$(function() {
  function buildHTML(message){
    var html = `<h2 class = "chat__content1__name">
                    ${message.user_name}</h2>
                <p class = "chat__content1__date">
                    ${message.created_at}</p>
                <div class = "chat__content1__message">
                      ${message.body}</div>
                <div>
                  <img src= ${message.avatar_url}></div>`
    return html;
  }
  function buildHTML_no_image(message){
    var html = `<h2 class = "chat__content1__name">
                    ${message.user_name}</h2>
                <p class = "chat__content1__date">
                    ${message.created_at}</p>
                <div class = "chat__content1__message">
                      ${message.body}</div>
                `
    return html;
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
        console.log(data);
        if (data['avatar_url'] != null){
          var html = buildHTML(data);
        } else {
          var html = buildHTML_no_image(data);
        }


        $('.chat__content').append(html)
        var target = $(".chat__content").get(0).scrollHeight;
        $('.chat__content').animate({scrollTop: target}, 'slow');
      })

      .fail(function(){
      alert('error');
    })
  });
});
