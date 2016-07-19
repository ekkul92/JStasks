var $ = require('jquery');
var showAppsList = require('./ShowApplicationList.js');

module.exports = {
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
      if (username !== 'Admin') {
        $('.admin-panel').hide();
      } else {
        $('.admin-panel').show('normal');
      }

      $.ajax({
        type: "POST",
        url: "/api/activeUsers",
        data: ({login: username})
      }).done(function (data) {

        $('#reg_name').val('');
        $('#reg_form').hide();
        showAppsList.showApplicationList(username);

      }).fail(function () {
        alert('Error!');
      });

    });
  }
};
