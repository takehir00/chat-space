$(function() {
  function buildHTML(message){
    var body = ""
    var image= ""
    if (message.body != null){
      var body = message.body
    }
    if (message.image_url != null){
      var image = `<img src="${message.image_url}">`
    }
    var html = `<div class="chat__content1__parent" data-message-id=${message.id}>
                  <h2 class="chat__content1__name">
                     ${message.user_name}</h2>
                  <p class="chat__content1__date">
                     ${message.created_at}</p>
                  <div class="chat__content1__message">
                       ${message.body}</div>
                  <div>
                  ${image}</div>
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
    if (window.location.pathname.match(/\/groups\/\d+\/messages/)){
      var url = location.pathname
      var message_id = $('.chat__content .chat__content1__parent:last-child').data('message-id')
      console.log(message_id)
      $.ajax({
        url: url,
        type: "GET",
        data: {message_id: message_id},
        dataType: 'json'
      })
      .done(function(messages){
        if(messages != null){
          messages.forEach(function(message){
            var html = buildHTML(message)
            $('.chat__content').append(html)
          })
        }
      })
      .fail(function(){
        alert('自動更新に失敗しました');
      });
    }else{
  }},5000);
});
