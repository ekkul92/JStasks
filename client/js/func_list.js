;
var jq = require('jquery');
var _ = require('lodash');

module.exports = {
  //Конструктор объекта заявки
  CreateApp: CreateApp,

  //показать список заявок
  showApplicationList: showApplicationList,

  //Вход в систему                    ***
  enterSystem: function () {
    var username = jq('#login_name').val();

    if ((/\s+/.test(jq('#login_name').val())) || (jq('#login_name').val() === '')) {
      alert('Введите, пожалуйста, логин!');
      jq('#login_name').val('');
      return;
    }

    jq.ajax({
      type: "GET",                // метод
      url: "http://0.0.0.0:3000/api/users/" + username
    }).done(function (data) {
      jq('#logIn_form').hide();

      jq.ajax({
        type: "POST",
        url: "http://localhost:3000/api/activeUsers",
        data: ({login: username})
      }).done(function (data) {
        if (username !== 'Admin') {
          jq('.admin-panel').hide();
        } else {
          jq('.admin-panel').show('normal');
        }
        showApplicationList(username);
      }).fail(function () {
        alert('Error!');
      });

    }).fail(function (data) {
      alert('Вы не зарегистрированы!');
    });

    /*var users = JSON.parse(localStorage.getItem('users'));

     if ( users.persons.hasOwnProperty( jq('#login_name').val() ) || users.Contractors.hasOwnProperty( jq('#login_name').val() ) ){

     jq('#logIn_form').hide();
     localStorage.setItem('ActiveUser', jq('#login_name').val());
     showApplicationList(localStorage.getItem('ActiveUser'));

     jq('#login_name').val('');

     if (jq('#login_name').val() !== 'Admin'){
     jq('.admin-panel').hide();
     } else {
     jq('.admin-panel').show('normal');
     }
     location.reload();

     } else {
     //alert('Вы не зарегистрированы!');
     }
     */
  },

  //Выход из системы
  /*exitSystem: function(){
   localStorage.removeItem('ActiveUser');
   jq('#applicationsList').hide();
   jq('#logIn_form').show();
   jq('.apps').html('');
   jq('#empty-list').hide();
   jq('.admin-panel').hide();
   location.reload();
   },*/

  //***
  exitSystem: function () {
    var username = jq('.user-name').text();
      jq.ajax(
        {
          type: "DELETE",
          url: "http://localhost:3000/api/activeUsers/" + username
        }).done(function(){
          jq('#applicationsList').hide();
          jq('#logIn_form').show();
          jq('.apps').html('');
          jq('#empty-list').hide();
          jq('.admin-panel').hide();
      });
    },



    //Регистрация пользователя                   ***
    createUser: function() {
      var username = jq('#reg_name').val();

      if ((/\s+/.test(username)) || ( username === '')) {
        alert('Введите, пожалуйста, логин!');
        jq('#reg_name').val('');
        return;
      }

      jq.ajax({
        type: "POST",
        url: "http://localhost:3000/api/users",
        data: ({login: username})
      }).done(function (data) {
        if (username !== 'Admin') {
          jq('.admin-panel').hide();
        } else {
          jq('.admin-panel').show('normal');
        }

        jq.ajax({
          type: "POST",
          url: "http://localhost:3000/api/activeUsers",
          data: ({login: username})
        }).done(function (data) {

          jq('#reg_name').val('');
          jq('#reg_form').hide();
          showApplicationList(username);

        }).fail(function () {
          alert('Error!');
        });

      });

    },

  /*
   //Регистрация пользователя
   createUser: function(){
   if ((/\s+/.test(jq('#reg_name').val())) || (jq('#reg_name').val() === '')) {
   alert('Введите, пожалуйста, логин!');
   jq('#reg_name').val('');
   return;
   }
   var users = JSON.parse(localStorage.getItem('users'));

   if (users.persons.hasOwnProperty( jq('#reg_name').val() )){
   alert('Данный пользовать уже существует!');
   jq('#reg_name').val('');
   return;
   } else {
   users.persons[jq('#reg_name').val()] = 'Client';
   localStorage.removeItem('users');
   localStorage.setItem('users', JSON.stringify(users));
   localStorage.setItem('ActiveUser', jq('#reg_name').val());

   if (jq('#reg_name').val() !== 'Admin'){
   jq('.admin-panel').hide();
   } else {
   jq('.admin-panel').show('normal');
   }

   var apps = JSON.parse(localStorage.getItem('apps'));
   apps[jq('#reg_name').val()] = [];
   localStorage.removeItem('apps');
   localStorage.setItem('apps', JSON.stringify(apps));

   jq('#reg_name').val('');
   jq('#reg_form').hide();
   showApplicationList(localStorage.getItem('ActiveUser'));
   }
   },
   */



    //Показать форму создания заявки  -****
    showFormForAddApp: function(){
        event.preventDefault(); // выключaем стaндaртную рoль элементa
        jq('#overlay').fadeIn(400, // снaчaлa плaвнo пoкaзывaем темную пoдлoжку
            function(){ // пoсле выпoлнения предъидущей aнимaции
                jq('#modal_add_app')
                    .css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
                    .animate({opacity: 1, top: '50%'}, 200); // плaвнo прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз

                var sel = document.getElementById('contractors');

              jq.ajax({
                type: "GET",
                url: "http://localhost:3000/api/contractors"
              }).done(function(data){
                data.forEach(function(elem){
                  sel.options[sel.options.length] = new Option ( elem.login );
                });
              })
            });
    },

    //Создание заявки
    createApp: function(){

      if (jq('.comment').val() === "" || jq('#estimated').val() === '' || jq('#deadline').val() === ""){
        alert ('Не все данные заполнены');
        return;
      }

      var username = jq(".user-name").text();

      var Appl = CreateApp(username, jq('#contractors').val(), jq('.comment').val(),
          jq('#priority').val(), jq('#estimated').val(), jq('#deadline').val(), 0);

      jq.ajax({
        type: "POST",
        url: "http://localhost:3000/api/users/" + username + "/apps",
        data: ( Appl )
      }).done(function(){
        if (username !== 'Admin'){
          jq.ajax({
            type: "POST",
            url: "http://localhost:3000/api/users/Admin/apps",
            data: ( Appl )
          }).done(function(){
            jq('#modal_close').click();
          });
        }
        jq('#modal_close').click();
        showApplicationList(username)
      });
    },


  /*//Создание заявки
  createApp: function(){
    var apps = JSON.parse(localStorage.getItem('apps'));
    var Appl = CreateApp(localStorage.getItem('ActiveUser'), jq('#contractors').val(), jq('.comment').val(),
      jq('#priority').val(), jq('#estimated').val(), jq('#deadline').val(), 0);

    apps[localStorage.getItem('ActiveUser')][apps[localStorage.getItem('ActiveUser')].length] = Appl;
    if (localStorage.getItem('ActiveUser') !== 'Admin') apps.Admin[apps.Admin.length] = Appl;

    localStorage.removeItem('apps');
    localStorage.setItem('apps', JSON.stringify(apps));
    jq('#modal_close').click();
    location.reload();
  },
    */
    //Зaкрытие мoдaльнoгo oкнa
    closeModal: function () {
        jq('#modal_add_app')
            .animate({opacity: 0, top: '45%'}, 200,  // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
                function(){ // пoсле aнимaции
                    jq(this).css('display', 'none'); // делaем ему display: none;
                    jq('#overlay').fadeOut(200); // скрывaем пoдлoжку
                }
            );
        var sel2 = document.getElementById('contractors');
        sel2.options.length = 0;
        jq('.comment').val('');
        jq('#estimated').val('');
        jq('#deadline').val('');
        jq('.edit_panel').hide('normal');
        jq('#status_value').val('');
    },

    //Добавление исполнителя  ***
    addContr: function () {
        if ((/\s+/.test(jq('#contr-name').val())) || (jq('#contr-name').val() === '')) {
            alert('Введите, пожалуйста, логин!');
            jq('#contr-name').val('');
            return;
        }
      var contractor = jq('#contr-name').val();

      jq.ajax({
        type: "POST",
        url: "http://localhost:3000/api/contractors",
        data: ({ login : contractor })
      }).done( function(){
        alert('Исполнитель успешно добавлен!');
        jq('.form-for-add-contr').slideToggle(200);
        jq('#contr-name').val('');
      }).fail(function(){
        alert('Данные исполнителя уже зарегистрированы')
      });

    },

    //Показать форму назначения исполнителя
    showFormForAddContr: function(){
        var sel = document.getElementById('contr-list');
        sel.options.length = 0;

      jq.ajax({
        type: "GET",
        url: "http://localhost:3000/api/contractors"
      }).done( function( data){

        data.forEach(function (elem) {
          sel.options[sel.options.length] = new Option(elem.login);
        });

        sel = document.getElementById('apps-list');
        sel.options.length = 0;

        for (var i = 1; i <= jq('.apps').children().length; i++){
          sel.options[sel.options.length] = new Option('Заявка' + i);
        }
        jq('.form-for-make-contr').slideToggle(200);
      })
    },

    //назначение исполнителя
    appointContr: function () {
        if(jq('#contr-list').val() === null){
            alert('Нет исполнителей для назначения!');
            return;
        }
        if(jq('#apps-list').val() === null){
            alert('Нет заявок для назначения!');
            return;
        }

        var s = jq('.app:contains(' + jq('#apps-list').val() + ')').text();
        var name = s.substring( s.indexOf('Клиент: ') + 8, s.indexOf('Исполнитель:')-13 );
        var info = s.substring( s.indexOf('Информация: ') + 12, s.indexOf('Приоритет:')-13 );
        var app_n = jq('#apps-list').val().substring(6);

      jq.ajax( {
        type: "GET",
        url: "http://localhost:3000/api/users/" + name + "/apps"
      }).done( function( data ){

        var userObj = {};

        for (var i = 0; i < data.length; i++){
          if (data[i].info === info){
            data[i].contractor = jq('#contr-list').val();
            userObj = new Object(data[i]);
            break;
          }
        }

        jq.ajax( {
          type: "PUT",
          url: "http://localhost:3000/api/apps",
          data: (userObj)
        }).done( function( data ){
        });
      });

      if(name !== 'Admin'){
        jq.ajax({
          type: "GET",
          url: "http://localhost:3000/api/users/Admin/apps"
        }).done(function( data ){
          var adminObj = {};

          for (var i = 0; i < data.length; i++){
            if (data[i].info === info){
              data[i].contractor = jq('#contr-list').val();
              adminObj = new Object(data[i]);
              break;
            }
          }

          jq.ajax( {
            type: "PUT",
            url: "http://localhost:3000/api/apps",
            data: (adminObj)
          }).done( function( data ){
            showApplicationList(jq('.user-name').text());
          });
        });
      }
    },

    //Показать форму для изменения статуса заявки
    showFormForEditStatus: function(){
        var s = jq(this).parent().text();
        //var name = s.substring( s.indexOf('Клиент: ') + 8, s.indexOf('Исполнитель:') );
        //var info = s.substring( s.indexOf('Информация: ') + 12, s.indexOf('Приоритет:') );
        //var app_n = parseInt(s.substring(6));

        //var obj = {
        //name: s.substring( s.indexOf('Клиент: ') + 8, s.indexOf('Исполнитель:') ),
        //info: s.substring( s.indexOf('Информация: ') + 12, s.indexOf('Приоритет:') ),
        //contr: s.substring( s.indexOf('Исполнитель: ') + 13, s.indexOf('Информация:') ),
        //app_n: parseInt(s.substring(6))
        //};
        //localStorage.setItem('temporary', JSON.stringify(obj));

        jq('#status_value').val( parseFloat(s.substring(s.indexOf('Готовность: ') + 12, s.indexOf('Редактировать'))) );
        jq('#overlay').fadeIn('normal');
        jq('.edit_panel').show('normal');
    },

    //изменить статус заявки
    changeStatus: function () {
        var status = parseFloat(jq('#status_value').val());

        if (status > 100) status = 100;

        if (status > 0){
            // var obj = JSON.parse(localStorage.getItem('temporary'));
            // var apps = JSON.parse(localStorage.getItem('apps'));

            // for(var i = 0; i < apps[obj.name].length; i++){
            // if (obj.info === apps[obj.name][i].info){
            // apps[obj.name][i].ready = status + '%';
            // apps.Admin[obj.app_n-1].ready = status + '%';
            // if (apps[obj.contr] !== undefined) apps[obj.contr] = status + '%';
            // break;
            //  }
            //  }
        }

        jq('.edit_panel').hide('normal');
        jq('#status_value').val('');
        jq('#overlay').fadeOut('normal');
        //localStorage.removeItem('temporary');
        //localStorage.removeItem('apps');
        //localStorage.setItem('apps', JSON.stringify(apps));
        // location.reload();
    },

    filter: function() {
        var sel = document.getElementById('clients-list');
        sel.options.length = 0;

      jq.ajax({
        type: "GET",
        url: "http://localhost:3000/api/users"
      }).done(function( data){
         data.forEach( function (elem){
           sel.options[sel.options.length] = new Option(elem.login);
        });
        jq('.form-for-filter').slideToggle(200);
      })
    },

    showFilter: function() {
        var user = jq('#clients-list').val();
        jq('.app:not(:contains(Клиент: ' + user + '))').hide();
        jq('#cancel-filter').removeAttr('disabled');
    },

    cancelFilter: function() {
        jq('.app:hidden').show();
        jq('#cancel-filter').attr('disabled','');
    },

    searchApps: function (){
        var text = jq('#search-text').val();

        if ((/\s+/.test(text)) || (text === '')) {
            alert('Введите текст для поиска');
            jq('#search-text').val('');
            return;
        } else {
            jq('.app:not(:contains(' + text + '))').hide();
            jq('#cancel-search').removeAttr('disabled');
        }
    },

    cancelSearch: function (){
        jq('.app:hidden').show();
        jq('#cancel-search').attr('disabled','');
        jq('#search-text').val('');
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

  jq('#applicationsList > .list-title > .user-name').text(user);

  jq.ajax({
    type: "GET",
    url: "http://localhost:3000/api/users/" + user +"/apps"
  }).done( function( data ){

    if ( data.length === 0 ) {

      jq('#empty-list').show();
      jq('.apps').hide();
      jq('#applicationsList').fadeIn('normal');

    } else {
      jq('#empty-list').hide();

      var obj = { items: data };

      var tmpl = require("./template1.ejs");

      var html = tmpl( obj );

      jq('.list-content > .apps').html(html);

      jq('.apps').show();

      jq('#add-app').show();

      jq('#applicationsList').fadeIn('normal');

      jq('.app-title').click(function(){
        jq(this).siblings().slideToggle(200);
      });

      if ( user !== "Admin"){
        jq('.edit_status').hide();
      }

      jq('.edit_status').click(module.exports.showFormForEditStatus);

      if (isContractor){
        jq('#add-app').hide();
        jq('.admin-panel').hide();
      }
    }

  }).fail(function () {
    jq('#empty-list').show();
    jq('.apps').hide();
  });
}
