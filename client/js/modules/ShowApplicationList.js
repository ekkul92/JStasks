var $ = require('jquery');

var exit = require('./exitSystem.js');

module.exports = {
  showApplicationList: showApplicationList,

  //Показать форму для изменения статуса заявки
  showFormForEditStatus: function(){
    var edit_panel = {
      title : "Статус заявки",
      button_change: "Изменить"
    };

    var tmpl = require("./../templates/editPanel.ejs");

    var html = tmpl( edit_panel );

    $('.edit_panel').html(html);

    $('#change_status').click(module.exports.changeStatus);

    var s = $(this).parent().text();
    $('#status_value').val( parseFloat(s.substring(s.indexOf('Готовность: ') + 12, s.indexOf('Редактировать'))) );
    $('#overlay').fadeIn('normal');
    $('.edit_panel').show('normal');
  },

  //изменить статус заявки
  changeStatus: function () {
    var status = parseFloat($('#status_value').val());

    if (status > 100) status = 100;

    $('.edit_panel').hide('normal');
    $('#status_value').val('');
    $('#overlay').fadeOut('normal');
  }
};

//показать список заявок
function showApplicationList(user, isContractor) {

  //----------------------------
  var list_title = {
    button_add_app: "Добавить заявку",
    button_exit: "Выйти"
  };

  var tmpl = require("./../templates/list_title.ejs");

  var html = tmpl(list_title);

  $('.list-title').html(html);

  $('#exit').click(exit.exitSystem);


  var list_content = {
    empty_list: "Список заявок пуст ..."
  };

  tmpl = require("./../templates/list_content.ejs");

  html = tmpl(list_content);

  $('.list-content').html(html);
  //----------------------------

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
      } else {
        $('.edit_status').show();
        $('.edit_status').click(module.exports.showFormForEditStatus);
      }

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
