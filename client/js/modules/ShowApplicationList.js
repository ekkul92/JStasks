var $ = require('jquery');

//показать список заявок
function showApplicationList(user, isContractor) {

  $('#applicationsList > .list-title > .user-name').text(user);

  $.ajax({
    type: "GET",
    url: "/api/users/" + user + "/apps"
  }).done(function (data) {

    if (data.length === 0) {

      $('#empty-list').show();
      $('.apps').hide();
      $('#applicationsList').fadeIn('normal');

    } else {
      $('#empty-list').hide();

      var obj = {items: data};

      var tmpl = require("./../templates/template1.ejs");

      var html = tmpl(obj);

      $('.list-content > .apps').html(html);

      $('.apps').show();

      $('#add-app').show();

      $('#applicationsList').fadeIn('normal');

      $('.app-title').click(function () {
        $(this).siblings().slideToggle(200);
      });

      if (user !== "Admin") {
        $('.edit_status').hide();
      }

      $('.edit_status').click(module.exports.showFormForEditStatus);

      if (isContractor) {
        $('#add-app').hide();
        $('.admin-panel').hide();
      }
    }

  }).fail(function () {
    $('#empty-list').show();
    $('.apps').hide();
  });
}

module.exports = {
  showApplicationList: showApplicationList,

  //Показать форму для изменения статуса заявки
  showFormForEditStatus: function(){
    var s = $(this).parent().text();
    $('#status_value').val( parseFloat(s.substring(s.indexOf('Готовность: ') + 12, s.indexOf('Редактировать'))) );
    $('#overlay').fadeIn('normal');
    $('.edit_panel').show('normal');
  }
};
