var $ = require('jquery');
var _ = require('lodash');

var aut = require('./modules/Authorization.js');
var reg = require('./modules/Registration.js');

module.exports = {
  //Конструктор объекта заявки
  CreateApp: CreateApp,

  //показать список заявок
  showApplicationList: showApplicationList,

  //Вход в систему
  enterSystem: aut.enterSystem,

  //Выход из системы
  exitSystem: aut.exitSystem,

  //Регистрация пользователя
  createUser: reg.createUser,

  //Показать форму авторизации
  showAuthForm: aut.showAuthForm,

   showRegistrationForm: function(){
     var reg = {
       title: "Регистрация",
       reg_lab: "Логин",
       reg_button: "Создать профиль",
       cancel_button: "Отмена"
     };

     var tmpl = require("./templates/registration_form.ejs");

     var html = tmpl( reg );

     $('#reg_form').html(html).show();

     $('#logIn_form').hide();

     $('#cancel-reg').click(function(){
       $('#reg_form').hide();
       $('#logIn_form').show();
     });

     $('#create_ac').click(module.exports.createUser);
   },

    //Показать форму создания заявки
    showFormForAddApp: function(){

      var add_app = {
        title: "Добавить заявку",
        contractor: "Исполнитель: ",
        info: "Описание: ",
        priority: "Приоритет: ",
        item1: "Низкий",
        item2: "Средний",
        item3: "Высокий",
        estimated: "Ожидаемое время выполнения (в днях)",
        deadline: "Крайний срок (в днях)",
        button_add: "Добавить"
      };

      var tmpl = require("./templates/modal_create_app.ejs");

      var html = tmpl( add_app );

      $('#applicationsList > #modal_add_app').html(html);

      $('#modal_close, #overlay').click(module.exports.closeModal);

      //Создание заявки
      $('#create_app').click(module.exports.createApp);

        event.preventDefault(); // выключaем стaндaртную рoль элементa
        $('#overlay').fadeIn(400, // снaчaлa плaвнo пoкaзывaем темную пoдлoжку
            function(){ // пoсле выпoлнения предъидущей aнимaции
                $('#modal_add_app')
                    .css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
                    .animate({opacity: 1, top: '50%'}, 200); // плaвнo прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз

                var sel = document.getElementById('contractors');

              $.ajax({
                type: "GET",
                url: "/api/contractors"
              }).done(function(data){
                data.forEach(function(elem){
                  sel.options[sel.options.length] = new Option ( elem.login );
                });
              })
            });
    },

    //Создание заявки
    createApp: function(){

      if ($('.comment').val() === "" || $('#estimated').val() === '' || $('#deadline').val() === ""){
        alert ('Не все данные заполнены');
        return;
      }

      var username = $(".user-name").text();

      var Appl = CreateApp(username, $('#contractors').val(), $('.comment').val(),
          $('#priority').val(), $('#estimated').val(), $('#deadline').val(), 0);

      $.ajax({
        type: "POST",
        url: "/api/users/" + username + "/apps",
        data: ( Appl )
      }).done(function(){
        if (username !== 'Admin'){
          $.ajax({
            type: "POST",
            url: "/api/users/Admin/apps",
            data: ( Appl )
          }).done(function(){
            $('#modal_close').click();
          });
        }
        $('#modal_close').click();
        showApplicationList(username)
      });
    },

    //Зaкрытие мoдaльнoгo oкнa
    closeModal: function () {
        $('#modal_add_app')
            .animate({opacity: 0, top: '45%'}, 200,  // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
                function(){ // пoсле aнимaции
                    $(this).css('display', 'none'); // делaем ему display: none;
                    $('#overlay').fadeOut(200); // скрывaем пoдлoжку
                }
            );
        var sel2 = document.getElementById('contractors');
        sel2.options.length = 0;
        $('.comment').val('');
        $('#estimated').val('');
        $('#deadline').val('');
        $('.edit_panel').hide('normal');
        $('#status_value').val('');
    },

    //Добавление исполнителя  ***
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

        var tmpl = require("./templates/make_contractor.ejs");

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

    //назначение исполнителя                                                      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
          }).done(function (data) {
            showApplicationList($('.user-name').text());
          });
        });
      } else {
        showApplicationList($('.user-name').text());
      }
    },

    //Показать форму для изменения статуса заявки
    showFormForEditStatus: function(){
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

    },

    filter: function() {

		var filter ={
			filter : "Показать",
			cancel_filter: "Отменить"
        };

        var tmpl = require("./templates/filter_form.ejs");

        var html = tmpl( filter );

        $('.form-for-filter').html(html);

		//Фильтр
		$('#filter').click(module.exports.showFilter);

		//Отмена фильтра
		$('#cancel-filter').click(module.exports.cancelFilter);

        var sel = document.getElementById('clients-list');
        sel.options.length = 0;

      $.ajax({
        type: "GET",
        url: "/api/users"
      }).done(function( data){
         data.forEach( function (elem){
           sel.options[sel.options.length] = new Option(elem.login);
        });
        $('.form-for-filter').slideToggle(200);
      })
    },

    showFilter: function() {
        var user = $('#clients-list').val();
        $('.app:not(:contains(Клиент: ' + user + '))').hide();
        $('#cancel-filter').removeAttr('disabled');
    },

    cancelFilter: function() {
        $('.app:hidden').show();
        $('#cancel-filter').attr('disabled','');
    },

    searchApps: function (){
        var text = $('#search-text').val();

        if ((/\s+/.test(text)) || (text === '')) {
            alert('Введите текст для поиска');
            $('#search-text').val('');
            return;
        } else {
            $('.app:not(:contains(' + text + '))').hide();
            $('#cancel-search').removeAttr('disabled');
        }
    },

    cancelSearch: function (){
        $('.app:hidden').show();
        $('#cancel-search').attr('disabled','');
        $('#search-text').val('');
    }
};


//Конструктор объекта заявки
function CreateApp(client, contractor, info, priority, estimated, deadline, ready){
    if(! (this instanceof CreateApp)) {return new CreateApp(client, contractor, info, priority, estimated, deadline, ready);}
    this.client = client;
    this.contractor = contractor;
    this.info = info;
    this.priority = priority;
    this.estimated = estimated;
    this.deadline = deadline;
    this.ready = ready + '%';
}


//показать список заявок
function showApplicationList(user, isContractor){

  $('#applicationsList > .list-title > .user-name').text(user);

  $.ajax({
    type: "GET",
    url: "/api/users/" + user +"/apps"
  }).done( function( data ){

    if ( data.length === 0 ) {

      $('#empty-list').show();
      $('.apps').hide();
      $('#applicationsList').fadeIn('normal');

    } else {
      $('#empty-list').hide();

      var obj = { items: data };

      var tmpl = require("./templates/template1.ejs");

      var html = tmpl( obj );

      $('.list-content > .apps').html(html);

      $('.apps').show();

      $('#add-app').show();

      $('#applicationsList').fadeIn('normal');

      $('.app-title').click(function(){
        $(this).siblings().slideToggle(200);
      });

      if ( user !== "Admin"){
        $('.edit_status').hide();
      }

      $('.edit_status').click(module.exports.showFormForEditStatus);

      if (isContractor){
        $('#add-app').hide();
        $('.admin-panel').hide();
      }
    }

  }).fail(function () {
    $('#empty-list').show();
    $('.apps').hide();
  });
}
