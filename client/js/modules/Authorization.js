var $ = require('jquery');
var showAppsList = require('./ShowApplicationList.js');

module.exports = {
  //Вход в систему
  enterSystem: function () {
    var username = $('#login_name').val();

    if ((/\s+/.test($('#login_name').val())) || ($('#login_name').val() === '')) {
      alert('Введите, пожалуйста, логин!');
      $('#login_name').val('');
      return;
    }

    $.ajax({
      type: "GET",                // метод
      url: "/api/users/" + username
    }).done(function (data) {
      $('#logIn_form').hide();

      $.ajax({
        type: "POST",
        url: "/api/activeUsers",
        data: ({login: username})
      }).done(function (data) {
        if (username !== 'Admin') {
          $('.admin-panel').hide();
        } else {
          $('.admin-panel').show('normal');
        }
        showAppsList.showApplicationList(username);
      }).fail(function () {
        alert('Error!');
      });

    }).fail(function (data) {
      alert('Вы не зарегистрированы!');
    });
  },

  //Выход из системы
  exitSystem: function () {
    var username = $('.user-name').text();
    $.ajax(
      {
        type: "DELETE",
        url: "/api/activeUsers/" + username
      }).done(function(){
      $('#applicationsList').hide();
      $('#logIn_form').show();
      $('.apps').html('');
      $('#empty-list').hide();
      $('.admin-panel').hide();
    });
  },

  showAuthForm: function(){
    var auth = {
      title: "Авторизация",
      auth_lab: "Логин",
      auth_button: "Войти",
      reg_button: "Регистрация"
    };

    var tmpl = require ("./../templates/authorization_form.ejs");

    var html = tmpl ( auth );
    $('#logIn_form').html(html);
  }
};
