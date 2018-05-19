$(document).on("turbolinks:load", function() {

  var user_list = $("#user-search-result");

  function appendUser(user) {
    var html =`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id = ${user.id} data-user-name= ${user.name}>追加</a>
              </div>`
    user_list.append(html)
  }

  function appendUserResult(userId, userName) {
    var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value= '${userId}'>
                <p class='chat-group-user__name'>'${userName}'</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
        return html;
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    if(input.length === 0){
      ("#user-search-result").empty();
    }else{


    $.ajax({
      type:'GET',
      url:'/users',
      data: {keyword: input},
      dataType:'json'
    })

    .done(function(users){
      $("#user-search-result").empty();
        users.forEach(function(user){
          appendUser(user);
        });
          })

     .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
   }
  });

  $("#user-search-result").on("click", ".chat-group-user__btn--add", function(){
    var userId = $(this).data('user-id');
    var userName = $(this).data('user-name');
    var html = appendUserResult(userId,userName);
    $("#chat-group-users").append(html);
    $(this).parent().remove();
  });

  $("#chat-group-users").on("click",".chat-group-user__btn--remove", function(){
    $(this).parent().remove();
  })

});
