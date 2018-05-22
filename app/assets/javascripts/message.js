$(function() {
  function buildHTML(message){
    var image = ""
    if (message.image_url != null){
      var image = `<img src = "${message.image_url}">`
    }
     var html = `<h2 class = "chat__content1__name">
                     ${message.user_name}</h2>
                 <p class = "chat__content1__date">
                     ${message.created_at}</p>
                 <div class = "chat__content1__message">
                       ${message.body}</div>
                  <div>
                  ${image}</div>`
    return html;
  }

  function appendHTML(message){
    var body = ""
    var image= ""
    if (message.body != null){
      var body = message.body
    }
    if (message.image_url != null){
      image = `<img src="${message.image_url}">`
    }
    var html = `<h2 class=chat__content1__name>
                  ${message.user_name}
                </h2>
                <p class=chat__content1__date>
                  ${message.created_at}
                </p>
                <div class=chat__content1__message>
                  ${body}
                </div>
                <div class=chat__content1__image>
                  ${image}
                </div>`
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
      var html = buildHTML(data)
      $('.chat__content').append(html)
      $('#new_message').get(0).reset();
      var target = $(".chat__content").get(0).scrollHeight;
      $('.chat__content').animate({scrollTop: target}, 'slow');
      })
      .fail(function(){
      alert('error');
    })
  });

  var interval = setInterval(function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var url = location.pathname
      $.ajax({
        url: url,
        type: "GET",
        dataType: 'json'
      })
      .done(function(messages){
        $('.chat__content').empty();
        messages.forEach(function(message){
          var html = appendHTML(message)
          $('.chat__content').append(html)
        })
      })
      .fail(function(){
        alert('自動更新に失敗しました');
      });
    }else{
  }},5000);
});
