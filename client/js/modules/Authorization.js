var $ = require('jquery');
var showAppsList = require('./ShowApplicationList.js');
var showAP = require('./showAdminPanel.js');
var App = require('./App.js');

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
          showAP.showAdminPanel();
        }
        showAppsList.showApplicationList(username);
        $('#add-app').click(App.showFormForAddApp);
      }).fail(function () {
        alert('Error!');
      });

    }).fail(function (data) {
      alert('Вы не зарегистрированы!');
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
