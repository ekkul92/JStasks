;

require('./../css/index.css');
var $ = require('jquery');

var func_list = require('./func_list');

//$(document).ready(function(){
  func_list.showAuthForm();

  $.ajax({
    type: "GET",                // метод
    url: "/api/users/Admin"
  }).done(function(data) {
    //alert(data.login);
  }).fail(function(data) {        // .fail — если произошла ошибка
    $.ajax({
      type: "POST",                // метод
      url: "/api/users",
      data: ({login : "Admin"})
    }).done(function(data) {
      //alert(data.username);
    }).fail(function(data) {        // .fail — если произошла ошибка
      console.log("Oops, error: " + data);
    });
  });

      $.ajax( {
        type: "GET",
        url: "/api/activeUsers"
      } ).done(function(data){

        if (data[0] !== undefined){
          $('.content:visible').children().hide();
          func_list.showApplicationList(data[0].login);

          if ( data[0].login === 'Admin' ){
            $('.edit_status').show();
          } else {
            $('.edit_status').hide();
          }
          if (data[0].login!== 'Admin'){
            $('.admin-panel').hide();
          } else {
            $('.admin-panel').show('normal');
          }
        } else {
          $('#logIn_form').show();
          $('.admin-panel').hide();
        }

      }).fail( function() {
        $('#logIn_form').show();
        $('.admin-panel').hide();
      });

    $('#enter').click(func_list.enterSystem);

    $('#exit').click(func_list.exitSystem);

    $('#sign-in').click(func_list.showRegistrationForm);

    $('#add-app').click(func_list.showFormForAddApp);

   

    /* Зaкрытие мoдaльнoгo oкнa */
    $('#overlay').click(func_list.closeModal);


    $('#add-contr').click(function(event){
        var add_contr ={
			add_button : "Добавить"
        };

        var tmpl = require("./templates/add_contactor.ejs");

        var html = tmpl( add_contr );

        $('.form-for-add-contr').html(html);

        $('.form-for-add-contr').slideToggle(200);

        $('#create_contr').click(func_list.addContr);

    });


    $('#filter-list').click(func_list.filter);

    $('#search-apps').click(function(event){
        $('.form-for-search').slideToggle(200);
    });

    //Поиск по заявкам
    $('#search').click(func_list.searchApps);

    //Отмена поиска
    $('#cancel-search').click(func_list.cancelSearch);

    //Добавление исполнителя

    $('#make-contr').click(func_list.showFormForAddContr);

    $('#change_status').click(func_list.changeStatus);
//});

exports.func_list = func_list;
