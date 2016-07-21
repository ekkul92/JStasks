var $ = require('jquery');

module.exports = {
  exitSystem: function () {
    var username = $('.user-name').text();
    $.ajax(
    {
      type: "DELETE",
      url: "/api/activeUsers/" + username
    }).done(function(){
      $('#applicationsList').hide();
      $('#logIn_form').show();
      $('.apps').html();
      $('#empty-list').hide();
      $('.admin-panel').hide();
    });
  }
};
