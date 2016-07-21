var $ = require('jquery');
var showAL = require('./ShowApplicationList.js');
var Filter = require('./Filter.js');
var Search = require('./Search.js');

module.exports = {
  //Панель Админа
  showAdminPanel: function(){
    var adminPanel = {
      title: "Панель администратора",
      button_add_contractor: "Добавить исполнителя",
      button_make_contractor: "Назначить исполнителя",
      button_filter: "Фильтр",
      button_search: "Поиск"
    };

    var tmpl = require("./../templates/adminPanel.ejs");

    var html = tmpl( adminPanel );

    $('.admin-panel').html(html);

    $('.admin-panel').show('normal');

    $('#add-contr').click(module.exports.showFormForContr);

    $('#make-contr').click(module.exports.showFormForAddContr);

    $('#filter-list').click(Filter.filter);

    $('#search-apps').click(Search.showFormForSearch);
  },

  showFormForContr: function(){
    var add_contr ={
      add_button : "Добавить"
    };

    var tmpl = require("./../templates/add_contactor.ejs");

    var html = tmpl( add_contr );

    $('.form-for-add-contr').html(html);

    $('.form-for-add-contr').slideToggle(200);

    $('#create_contr').click(module.exports.addContr);
  },

  //Добавление исполнителя
  addContr: function () {

    if ((/\s+/.test($('#contr-name').val())) || ($('#contr-name').val() === '')) {
      alert('Введите, пожалуйста, логин!');
      $('#contr-name').val('');
      return;
    }
    var contractor = $('#contr-name').val();

    $.ajax({
      type: "POST",
      url: "/api/contractors",
      data: ({ login : contractor })
    }).done( function(){
      alert('Исполнитель успешно добавлен!');
      $('.form-for-add-contr').slideToggle(200);
      $('#contr-name').val('');
    }).fail(function(){
      alert('Данные исполнителя уже зарегистрированы')
    });
  },

  //Показать форму назначения исполнителя
  showFormForAddContr: function(){

    var make_contr ={
      make_button : "Добавить"
    };

    var tmpl = require("./../templates/make_contractor.ejs");

    var html = tmpl( make_contr );

    $('.form-for-make-contr').html(html);

    $('#appoint_contr').click(module.exports.appointContr);

    var sel = document.getElementById('contr-list');
    sel.options.length = 0;

    $.ajax({
      type: "GET",
      url: "/api/contractors"
    }).done( function( data){

      data.forEach(function (elem) {
        sel.options[sel.options.length] = new Option(elem.login);
      });

      sel = document.getElementById('apps-list');
      sel.options.length = 0;

      for (var i = 1; i <= $('.apps').children().length; i++){
        sel.options[sel.options.length] = new Option('Заявка' + i);
      }
      $('.form-for-make-contr').slideToggle(200);
    })
  },

  //назначение исполнителя
  appointContr: function () {
    if ($('#contr-list').val() === null) {
      alert('Нет исполнителей для назначения!');
      return;
    }
    if ($('#apps-list').val() === null) {
      alert('Нет заявок для назначения!');
      return;
    }

    var s = $('.app:contains(' + $('#apps-list').val() + ')').text();
    var name = s.substring(s.indexOf('Клиент: ') + 8, s.indexOf('Исполнитель:') - 13);
    var info = s.substring(s.indexOf('Информация: ') + 12, s.indexOf('Приоритет:') - 13);
    var contractor = $('#contr-list').val();

    $.ajax({
      type: "GET",
      url: "/api/users/" + name + "/apps?filter[where][info]=" + info
    }).done(function (data) {

      var userObj = new Object(data[0]);
      userObj.contractor = contractor;

      $.ajax({
        type: "PUT",
        url: "/api/apps",
        data: (userObj)
      }).done(function (data) {
        showAL.showApplicationList($('.user-name').text());
      });
    });

    if (name !== 'Admin') {
      $.ajax({
        type: "GET",
        url: "/api/users/Admin/apps?filter[where][info]=" + info
      }).done(function (data) {
        var adminObj = new Object(data[0]);
        adminObj.contractor = contractor;

        $.ajax({
          type: "PUT",
          url: "/api/apps",
          data: (adminObj)
        }).done(function(){
          showAL.showApplicationList($('.user-name').text());
        });
      });
    }
  }
};
