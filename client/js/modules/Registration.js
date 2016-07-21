var $ = require('jquery');
var showAppsList = require('./ShowApplicationList.js');
var App = require('./App.js');

module.exports = {
  showRegistrationForm: function(){
    var reg = {
      title: "Регистрация",
      reg_lab: "Логин",
      reg_button: "Создать профиль",
      cancel_button: "Отмена"
    };

    var tmpl = require("./../templates/registration_form.ejs");

    var html = tmpl( reg );

    $('#reg_form').html(html).show();

    $('#logIn_form').hide();

    $('#cancel-reg').click(function(){
      $('#reg_form').hide();
      $('#logIn_form').show();
    });

    $('#create_ac').click(module.exports.createUser);
  },

  createUser: function() {
    var username = $('#reg_name').val();

    if ((/\s+/.test(username)) || ( username === '')) {
      alert('Введите, пожалуйста, логин!');
      $('#reg_name').val('');
      return;
    }

    $.ajax({
      type: "POST",
      url: "/api/users",
      data: ({login: username})
    }).done(function (data) {
      $.ajax({
        type: "POST",
        url: "/api/activeUsers",
        data: ({login: username})
      }).done(function (data) {

        $('#reg_name').val('');
        $('#reg_form').hide();
        showAppsList.showApplicationList(username);
        $('#add-app').click(App.showFormForAddApp);
      }).fail(function () {
        alert('Error!');
      });
    }).fail(function(){
      alert('Данный логин занят!');
    });
  }
};
