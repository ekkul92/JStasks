var index =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	;
	var jq = jQuery.noConflict();

	var func_list = __webpack_require__(1);

	jq(document).ready(function () {

	    if (localStorage.getItem('users') === null) {
	        localStorage.setItem('users', JSON.stringify({ 'persons': { 'Admin': 'Administrator' }, 'Contractors': {} }));
	    }
	    if (localStorage.getItem('apps') === null) {
	        localStorage.setItem('apps', JSON.stringify({ 'Admin': [] }));
	    }

	    if (localStorage.getItem('ActiveUser') !== null) {
	        jq('.content:visible').children().hide();
	        func_list.showApplicationList(localStorage.getItem('ActiveUser'));

	        var users = JSON.parse(localStorage.getItem('users'));
	        if (localStorage.getItem('ActiveUser') === 'Admin' || users.Contractors.hasOwnProperty(localStorage.getItem('ActiveUser'))) {
	            jq('.edit_status').show();
	        } else {
	            jq('.edit_status').hide();
	        }

	        if (localStorage.getItem('ActiveUser') !== 'Admin') {
	            jq('.admin-panel').hide();
	        } else {
	            jq('.admin-panel').show('normal');
	        }
	    } else {
	        jq('#logIn_form').show();
	        jq('.admin-panel').hide();
	    }

	    jq('#enter').click(func_list.enterSystem);

	    jq('#exit').click(func_list.exitSystem);

	    jq('#sign-in').click(function () {
	        jq('#logIn_form').hide();
	        jq('#reg_form').show();
	    });

	    jq('#create_ac').click(func_list.createUser);

	    jq('#cancel-reg').click(function () {
	        jq('#reg_form').hide();
	        jq('#logIn_form').show();
	    });

	    jq('#add-app').click(func_list.showFormForAddApp);

	    //Создание заявки
	    jq('#create_app').click(func_list.createApp);

	    /* Зaкрытие мoдaльнoгo oкнa */
	    jq('#modal_close, #overlay').click(func_list.closeModal);

	    jq('#add-contr').click(function (event) {
	        jq('.form-for-add-contr').slideToggle(200);
	    });

	    //Добавление исполнителя
	    jq('#create_contr').click(func_list.addContr);

	    jq('#make-contr').click(func_list.showFormForAddContr);

	    jq('#appoint_contr').click(func_list.appointContr);

	    jq('.app-title').click(function () {
	        jq(this).siblings().slideToggle(200);
	    });

	    jq('.edit_status').click(func_list.showFormForEditStatus);

	    jq('#change_status').click(func_list.changeStatus);
	});

	exports.func_list = func_list;

/***/ },
/* 1 */
/***/ function(module, exports) {

	;
	var jq = jQuery.noConflict();

	module.exports = {
	    //Конструктор объекта заявки
	    CreateApp: CreateApp,

	    //показать список заявок
	    showApplicationList: showApplicationList,

	    //Вход в систему
	    enterSystem: function () {
	        if (/\s+/.test(jq('#login_name').val()) || jq('#login_name').val() === '') {
	            alert('Введите, пожалуйста, логин!');
	            jq('#login_name').val('');
	            return;
	        }
	        var users = JSON.parse(localStorage.getItem('users'));

	        if (users.persons.hasOwnProperty(jq('#login_name').val()) || users.Contractors.hasOwnProperty(jq('#login_name').val())) {

	            jq('#logIn_form').hide();
	            localStorage.setItem('ActiveUser', jq('#login_name').val());
	            showApplicationList(localStorage.getItem('ActiveUser'));

	            jq('#login_name').val('');

	            if (jq('#login_name').val() !== 'Admin') {
	                jq('.admin-panel').hide();
	            } else {
	                jq('.admin-panel').show('normal');
	            }
	            location.reload();
	        } else {
	            alert('Вы не зарегистрированы!');
	        }
	    },

	    //Выход из системы
	    exitSystem: function () {
	        localStorage.removeItem('ActiveUser');
	        jq('#applicationsList').hide();
	        jq('#logIn_form').show();
	        jq('.apps').html('');
	        jq('#empty-list').hide();
	        jq('.admin-panel').hide();
	        location.reload();
	    },

	    //Регистрация пользователя
	    createUser: function () {
	        if (/\s+/.test(jq('#reg_name').val()) || jq('#reg_name').val() === '') {
	            alert('Введите, пожалуйста, логин!');
	            jq('#reg_name').val('');
	            return;
	        }
	        var users = JSON.parse(localStorage.getItem('users'));

	        if (users.persons.hasOwnProperty(jq('#reg_name').val())) {
	            alert('Данный пользовать уже существует!');
	            jq('#reg_name').val('');
	            return;
	        } else {
	            users.persons[jq('#reg_name').val()] = 'Client';
	            localStorage.removeItem('users');
	            localStorage.setItem('users', JSON.stringify(users));
	            localStorage.setItem('ActiveUser', jq('#reg_name').val());

	            if (jq('#reg_name').val() !== 'Admin') {
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

	    //Показать форму создания заявки
	    showFormForAddApp: function () {
	        event.preventDefault(); // выключaем стaндaртную рoль элементa
	        jq('#overlay').fadeIn(400, // снaчaлa плaвнo пoкaзывaем темную пoдлoжку
	        function () {
	            // пoсле выпoлнения предъидущей aнимaции
	            jq('#modal_add_app').css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
	            .animate({ opacity: 1, top: '50%' }, 200); // плaвнo прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз

	            var sel = document.getElementById('contractors');
	            var users = JSON.parse(localStorage.getItem('users'));
	            for (var key in users.Contractors) {
	                sel.options[sel.options.length] = new Option(key);
	            }
	        });
	    },

	    //Создание заявки
	    createApp: function () {
	        var apps = JSON.parse(localStorage.getItem('apps'));
	        var Appl = CreateApp(localStorage.getItem('ActiveUser'), jq('#contractors').val(), jq('.comment').val(), jq('#priority').val(), jq('#estimated').val(), jq('#deadline').val(), 0);

	        apps[localStorage.getItem('ActiveUser')][apps[localStorage.getItem('ActiveUser')].length] = Appl;
	        apps.Admin[apps.Admin.length] = Appl;

	        localStorage.removeItem('apps');
	        localStorage.setItem('apps', JSON.stringify(apps));
	        jq('#modal_close').click();
	        location.reload();
	    },

	    //Зaкрытие мoдaльнoгo oкнa
	    closeModal: function () {
	        jq('#modal_add_app').animate({ opacity: 0, top: '45%' }, 200, // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
	        function () {
	            // пoсле aнимaции
	            jq(this).css('display', 'none'); // делaем ему display: none;
	            jq('#overlay').fadeOut(200); // скрывaем пoдлoжку
	        });
	        var sel2 = document.getElementById('contractors');
	        sel2.options.length = 0;
	        jq('.comment').val('');
	        jq('#estimated').val('');
	        jq('#deadline').val('');
	        jq('.edit_panel').hide('normal');
	        jq('#status_value').val('');
	    },

	    //Добавление исполнителя
	    addContr: function () {
	        if (/\s+/.test(jq('#contr-name').val()) || jq('#contr-name').val() === '') {
	            alert('Введите, пожалуйста, логин!');
	            jq('#contr-name').val('');
	            return;
	        }

	        var users = JSON.parse(localStorage.getItem('users'));
	        if (users['Contractors'] === undefined) {
	            users['Contractors'] = {};
	        }

	        if (users.Contractors.hasOwnProperty(jq('#contr-name').val())) {
	            alert('Данный исполнитель уже существует!');
	            return;
	        }

	        users.Contractors[jq('#contr-name').val()] = 0;
	        localStorage.removeItem('users');
	        localStorage.setItem('users', JSON.stringify(users));

	        var apps = JSON.parse(localStorage.getItem('apps'));
	        apps[jq('#contr-name').val()] = [];
	        localStorage.removeItem('apps');
	        localStorage.setItem('apps', JSON.stringify(apps));

	        alert('Исполнитель успешно добавлен!');
	        jq('.form-for-add-contr').slideToggle(200);
	        jq('#contr-name').val('');
	    },

	    //Показать форму создания исполнителя
	    showFormForAddContr: function () {
	        var sel = document.getElementById('contr-list');
	        sel.options.length = 0;
	        var users = JSON.parse(localStorage.getItem('users'));
	        for (var key in users.Contractors) {
	            sel.options[sel.options.length] = new Option(key);
	        }

	        sel = document.getElementById('apps-list');
	        sel.options.length = 0;

	        for (var i = 1; i <= jq('.apps').children().length; i++) {
	            sel.options[sel.options.length] = new Option('Заявка' + i);
	        }
	        jq('.form-for-make-contr').slideToggle(200);
	    },

	    //назначение исполнитля
	    appointContr: function () {
	        if (jq('#contr-list').val() === null) {
	            alert('Нет исполнителей для назначения!');
	            return;
	        }
	        if (jq('#apps-list').val() === null) {
	            alert('Нет заявок для назначения!');
	            return;
	        }

	        var s = jq('.app:contains(' + jq('#apps-list').val() + ')').text();
	        var name = s.substring(s.indexOf('Клиент: ') + 8, s.indexOf('Исполнитель:'));
	        var info = s.substring(s.indexOf('Информация: ') + 12, s.indexOf('Приоритет:'));
	        var app_n = jq('#apps-list').val().substring(6);

	        var apps = JSON.parse(localStorage.getItem('apps'));
	        for (var i = 0; i < apps[name].length; i++) {
	            if (info === apps[name][i].info) {
	                apps[name][i].contractor = jq('#contr-list').val();
	                apps.Admin[app_n - 1].contractor = jq('#contr-list').val();
	                apps[jq('#contr-list').val()][apps[jq('#contr-list').val()].length] = new Object(apps[name][i]);
	                break;
	            }
	        }

	        localStorage.removeItem('apps');
	        localStorage.setItem('apps', JSON.stringify(apps));
	        location.reload();
	    },

	    //Показать форму для изменения статуса заявки
	    showFormForEditStatus: function () {
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

	        jq('#status_value').val(parseFloat(s.substring(s.indexOf('Готовность: ') + 12, s.indexOf('Редактировать'))));
	        jq('#overlay').fadeIn('normal');
	        jq('.edit_panel').show('normal');
	    },

	    //изменить статус заявки
	    changeStatus: function () {
	        var status = parseFloat(jq('#status_value').val());

	        if (status > 100) status = 100;

	        if (status > 0) {
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
	    }
	};

	//Конструктор объекта заявки
	function CreateApp(client, contractor, info, priority, estimated, deadline, ready) {
	    if (!(this instanceof CreateApp)) {
	        return new CreateApp(client, contractor, info, priority, estimated, deadline, ready);
	    }
	    this.client = client;
	    this.contractor = contractor;
	    this.info = info;
	    this.priority = priority;
	    this.estimated = estimated;
	    this.deadline = deadline;
	    this.ready = ready + '%';
	}

	//показать список заявок
	function showApplicationList(user) {
	    jq('#applicationsList > .list-title > .user-name').text(user);

	    var apps = JSON.parse(localStorage.getItem('apps'));

	    if (apps[user].length === 0) {
	        jq('#empty-list').show();
	        jq('.apps').hide();
	    } else {
	        var code = "";
	        var arr = apps[user];
	        for (var i = 0; i < arr.length; i++) {
	            code += "<div class='app'><div class='app-title'>Заявка" + (i + 1) + "</div>" + "<div class='app-info'>Клиент: " + arr[i].client + "<br>" + "Исполнитель: " + arr[i].contractor + "<br>" + "Информация: " + arr[i].info + "<br>" + "Приоритет: " + arr[i].priority + "<br>" + "Ожидаемое время исполнения: " + arr[i].estimated + " дн.<br>" + "Крайние сроки: " + arr[i].deadline + " дн.<br>" + "Готовность: " + arr[i].ready + "<br><button class='edit_status'>Редактировать статус заявки</button>" + "</div></div>";
	        }
	        jq('.list-content > .apps').html(code);

	        jq('.apps').show();
	    }

	    var users = JSON.parse(localStorage.getItem('users'));
	    if (users.persons[user] !== 'Client' && users.persons[user] !== 'Administrator') {
	        jq('#add-app').hide();
	    } else {
	        jq('#add-app').show();
	    }

	    jq('#applicationsList').fadeIn('normal'); //add-app
	}

	/*
	//Вход в систему
	function enterSystem(){
	   if ((/\s+/.test(jq('#login_name').val())) || (jq('#login_name').val() === '')) {
	       alert('Введите, пожалуйста, логин!');
	       jq('#login_name').val('');
	       return;
	   }
	   var users = JSON.parse(localStorage.getItem('users'));

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
	       alert('Вы не зарегистрированы!');
	   }
	}


	//Выход из системы
	function exitSystem(){
	   localStorage.removeItem('ActiveUser');
	   jq('#applicationsList').hide();
	   jq('#logIn_form').show();
	   jq('.apps').html('');
	   jq('#empty-list').hide();
	   jq('.admin-panel').hide();
	   location.reload();
	}


	//Регистрация пользователя
	function createUser(){
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
	}


	//Показать форму создания заявки
	function showFormForAddApp(){
	   event.preventDefault(); // выключaем стaндaртную рoль элементa
	   jq('#overlay').fadeIn(400, // снaчaлa плaвнo пoкaзывaем темную пoдлoжку
	       function(){ // пoсле выпoлнения предъидущей aнимaции
	           jq('#modal_add_app')
	               .css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
	               .animate({opacity: 1, top: '50%'}, 200); // плaвнo прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз

	           var sel = document.getElementById('contractors');
	           var users = JSON.parse(localStorage.getItem('users'));
	           for(var key in users.Contractors){
	               sel.options[sel.options.length] = new Option(key);
	           }
	       });
	}


	//Создание заявки
	function createApp(){
	   var apps = JSON.parse(localStorage.getItem('apps'));
	   var Appl = CreateApp(localStorage.getItem('ActiveUser'), jq('#contractors').val(), jq('.comment').val(),
	       jq('#priority').val(), jq('#estimated').val(), jq('#deadline').val(), 0);

	   apps[localStorage.getItem('ActiveUser')][apps[localStorage.getItem('ActiveUser')].length] = Appl;
	   apps.Admin[apps.Admin.length] = Appl;

	   localStorage.removeItem('apps');
	   localStorage.setItem('apps', JSON.stringify(apps));
	   jq('#modal_close').click();
	   location.reload();
	}


	//Зaкрытие мoдaльнoгo oкнa
	function closeModal(){
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
	}


	//Добавление исполнителя
	function addContr(){
	   if ((/\s+/.test(jq('#contr-name').val())) || (jq('#contr-name').val() === '')) {
	       alert('Введите, пожалуйста, логин!');
	       jq('#contr-name').val('');
	       return;
	   }

	   var users = JSON.parse(localStorage.getItem('users'));
	   if (users['Contractors'] === undefined){
	       users['Contractors'] = {};
	   }

	   if (users.Contractors.hasOwnProperty(jq('#contr-name').val())){
	       alert('Данный исполнитель уже существует!');
	       return;
	   }

	   users.Contractors[jq('#contr-name').val()] = 0;
	   localStorage.removeItem('users');
	   localStorage.setItem('users', JSON.stringify(users));

	   var apps = JSON.parse(localStorage.getItem('apps'));
	   apps[jq('#contr-name').val()] = [];
	   localStorage.removeItem('apps');
	   localStorage.setItem('apps', JSON.stringify(apps));

	   alert('Исполнитель успешно добавлен!');
	   jq('.form-for-add-contr').slideToggle(200);
	   jq('#contr-name').val('');
	}


	//Показать форму создания исполнителя
	function showFormForAddContr(){
	   var sel = document.getElementById('contr-list');
	   sel.options.length = 0;
	   var users = JSON.parse(localStorage.getItem('users'));
	   for(var key in users.Contractors){
	       sel.options[sel.options.length] = new Option(key);
	   }

	   sel = document.getElementById('apps-list');
	   sel.options.length = 0;

	   for (var i = 1; i <= jq('.apps').children().length; i++){
	       sel.options[sel.options.length] = new Option('Заявка' + i);
	   }
	   jq('.form-for-make-contr').slideToggle(200);
	}


	//назначение исполнитля
	function appointContr(){
	   if(jq('#contr-list').val() === null){
	       alert('Нет исполнителей для назначения!');
	       return;
	   }
	   if(jq('#apps-list').val() === null){
	       alert('Нет заявок для назначения!');
	       return;
	   }

	   var s = jq('.app:contains(' + jq('#apps-list').val() + ')').text();
	   var name = s.substring( s.indexOf('Клиент: ') + 8, s.indexOf('Исполнитель:') );
	   var info = s.substring( s.indexOf('Информация: ') + 12, s.indexOf('Приоритет:') );
	   var app_n = jq('#apps-list').val().substring(6);

	   var apps = JSON.parse(localStorage.getItem('apps'));
	   for(var i = 0; i < apps[name].length; i++){
	       if (info === apps[name][i].info){
	           apps[name][i].contractor = jq('#contr-list').val();
	           apps.Admin[app_n-1].contractor = jq('#contr-list').val();
	           apps[jq('#contr-list').val()][apps[jq('#contr-list').val()].length] = new Object(apps[name][i]);
	           break;
	       }
	   }

	   localStorage.removeItem('apps');
	   localStorage.setItem('apps', JSON.stringify(apps));
	   location.reload();
	}


	//Показать форму для изменения статуса заявки
	function showFormForEditStatus(){
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
	}


	//изменить статус заявки
	function changeStatus(){
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
	}*/

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTVhMDIyYzRlNjllZTY5MDY5NWYiLCJ3ZWJwYWNrOi8vL2luZGV4LmpzIiwid2VicGFjazovLy9mdW5jX2xpc3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA5NWEwMjJjNGU2OWVlNjkwNjk1ZlxuICoqLyIsIjtcclxudmFyIGpxID0galF1ZXJ5Lm5vQ29uZmxpY3QoKTtcclxuXHJcbnZhciBmdW5jX2xpc3QgPSByZXF1aXJlKCcuL2Z1bmNfbGlzdCcpO1xyXG5cclxuanEoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VycycpID09PSBudWxsKXtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcnMnLCBKU09OLnN0cmluZ2lmeSh7ICdwZXJzb25zJyA6IHsnQWRtaW4nIDogJ0FkbWluaXN0cmF0b3InfSwgJ0NvbnRyYWN0b3JzJzoge30gfSkpO1xyXG4gICAgfVxyXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhcHBzJykgPT09IG51bGwpe1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhcHBzJywgSlNPTi5zdHJpbmdpZnkoeydBZG1pbicgOiBbXX0pKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0FjdGl2ZVVzZXInKSAhPT0gbnVsbCl7XHJcbiAgICAgICAganEoJy5jb250ZW50OnZpc2libGUnKS5jaGlsZHJlbigpLmhpZGUoKTtcclxuICAgICAgICBmdW5jX2xpc3Quc2hvd0FwcGxpY2F0aW9uTGlzdChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnQWN0aXZlVXNlcicpKTtcclxuXHJcbiAgICAgICAgdmFyIHVzZXJzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcnMnKSk7XHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdBY3RpdmVVc2VyJykgPT09ICdBZG1pbicgfHwgdXNlcnMuQ29udHJhY3RvcnMuaGFzT3duUHJvcGVydHkobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0FjdGl2ZVVzZXInKSkpe1xyXG4gICAgICAgICAgICBqcSgnLmVkaXRfc3RhdHVzJykuc2hvdygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGpxKCcuZWRpdF9zdGF0dXMnKS5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0FjdGl2ZVVzZXInKSAhPT0gJ0FkbWluJyl7XHJcbiAgICAgICAgICAgIGpxKCcuYWRtaW4tcGFuZWwnKS5oaWRlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAganEoJy5hZG1pbi1wYW5lbCcpLnNob3coJ25vcm1hbCcpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAganEoJyNsb2dJbl9mb3JtJykuc2hvdygpO1xyXG4gICAgICAgIGpxKCcuYWRtaW4tcGFuZWwnKS5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAganEoJyNlbnRlcicpLmNsaWNrKGZ1bmNfbGlzdC5lbnRlclN5c3RlbSk7XHJcblxyXG4gICAganEoJyNleGl0JykuY2xpY2soZnVuY19saXN0LmV4aXRTeXN0ZW0pO1xyXG5cclxuICAgIGpxKCcjc2lnbi1pbicpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAganEoJyNsb2dJbl9mb3JtJykuaGlkZSgpO1xyXG4gICAgICAgIGpxKCcjcmVnX2Zvcm0nKS5zaG93KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBqcSgnI2NyZWF0ZV9hYycpLmNsaWNrKGZ1bmNfbGlzdC5jcmVhdGVVc2VyKTtcclxuXHJcbiAgICBqcSgnI2NhbmNlbC1yZWcnKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgIGpxKCcjcmVnX2Zvcm0nKS5oaWRlKCk7XHJcbiAgICAgICAganEoJyNsb2dJbl9mb3JtJykuc2hvdygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAganEoJyNhZGQtYXBwJykuY2xpY2soZnVuY19saXN0LnNob3dGb3JtRm9yQWRkQXBwKTtcclxuXHJcbiAgICAvL9Ch0L7Qt9C00LDQvdC40LUg0LfQsNGP0LLQutC4XHJcbiAgICBqcSgnI2NyZWF0ZV9hcHAnKS5jbGljayhmdW5jX2xpc3QuY3JlYXRlQXBwKTtcclxuXHJcbiAgICAvKiDQl2HQutGA0YvRgtC40LUg0Lxv0LRh0LvRjNC9b9CzbyBv0LrQvWEgKi9cclxuICAgIGpxKCcjbW9kYWxfY2xvc2UsICNvdmVybGF5JykuY2xpY2soZnVuY19saXN0LmNsb3NlTW9kYWwpO1xyXG5cclxuICAgIGpxKCcjYWRkLWNvbnRyJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgIGpxKCcuZm9ybS1mb3ItYWRkLWNvbnRyJykuc2xpZGVUb2dnbGUoMjAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8v0JTQvtCx0LDQstC70LXQvdC40LUg0LjRgdC/0L7Qu9C90LjRgtC10LvRj1xyXG4gICAganEoJyNjcmVhdGVfY29udHInKS5jbGljayhmdW5jX2xpc3QuYWRkQ29udHIpO1xyXG5cclxuICAgIGpxKCcjbWFrZS1jb250cicpLmNsaWNrKGZ1bmNfbGlzdC5zaG93Rm9ybUZvckFkZENvbnRyKTtcclxuXHJcbiAgICBqcSgnI2FwcG9pbnRfY29udHInKS5jbGljayhmdW5jX2xpc3QuYXBwb2ludENvbnRyKTtcclxuXHJcbiAgICBqcSgnLmFwcC10aXRsZScpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAganEodGhpcykuc2libGluZ3MoKS5zbGlkZVRvZ2dsZSgyMDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAganEoJy5lZGl0X3N0YXR1cycpLmNsaWNrKGZ1bmNfbGlzdC5zaG93Rm9ybUZvckVkaXRTdGF0dXMpO1xyXG5cclxuICAgIGpxKCcjY2hhbmdlX3N0YXR1cycpLmNsaWNrKGZ1bmNfbGlzdC5jaGFuZ2VTdGF0dXMpO1xyXG59KTtcclxuXHJcbmV4cG9ydHMuZnVuY19saXN0ID0gZnVuY19saXN0O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGluZGV4LmpzXG4gKiovIiwiO1xyXG52YXIganEgPSBqUXVlcnkubm9Db25mbGljdCgpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICAvL9Ca0L7QvdGB0YLRgNGD0LrRgtC+0YAg0L7QsdGK0LXQutGC0LAg0LfQsNGP0LLQutC4XHJcbiAgICBDcmVhdGVBcHA6IENyZWF0ZUFwcCxcclxuXHJcbiAgICAvL9C/0L7QutCw0LfQsNGC0Ywg0YHQv9C40YHQvtC6INC30LDRj9Cy0L7QulxyXG4gICAgc2hvd0FwcGxpY2F0aW9uTGlzdDogc2hvd0FwcGxpY2F0aW9uTGlzdCxcclxuXHJcbiAgICAvL9CS0YXQvtC0INCyINGB0LjRgdGC0LXQvNGDXHJcbiAgICBlbnRlclN5c3RlbTogZnVuY3Rpb24oKXtcclxuICAgICAgICBpZiAoKC9cXHMrLy50ZXN0KGpxKCcjbG9naW5fbmFtZScpLnZhbCgpKSkgfHwgKGpxKCcjbG9naW5fbmFtZScpLnZhbCgpID09PSAnJykpIHtcclxuICAgICAgICAgICAgYWxlcnQoJ9CS0LLQtdC00LjRgtC1LCDQv9C+0LbQsNC70YPQudGB0YLQsCwg0LvQvtCz0LjQvSEnKTtcclxuICAgICAgICAgICAganEoJyNsb2dpbl9uYW1lJykudmFsKCcnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdXNlcnMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VycycpKTtcclxuXHJcbiAgICAgICAgaWYgKCB1c2Vycy5wZXJzb25zLmhhc093blByb3BlcnR5KCBqcSgnI2xvZ2luX25hbWUnKS52YWwoKSApIHx8IHVzZXJzLkNvbnRyYWN0b3JzLmhhc093blByb3BlcnR5KCBqcSgnI2xvZ2luX25hbWUnKS52YWwoKSApICl7XHJcblxyXG4gICAgICAgICAgICBqcSgnI2xvZ0luX2Zvcm0nKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdBY3RpdmVVc2VyJywganEoJyNsb2dpbl9uYW1lJykudmFsKCkpO1xyXG4gICAgICAgICAgICBzaG93QXBwbGljYXRpb25MaXN0KGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdBY3RpdmVVc2VyJykpO1xyXG5cclxuICAgICAgICAgICAganEoJyNsb2dpbl9uYW1lJykudmFsKCcnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChqcSgnI2xvZ2luX25hbWUnKS52YWwoKSAhPT0gJ0FkbWluJyl7XHJcbiAgICAgICAgICAgICAgICBqcSgnLmFkbWluLXBhbmVsJykuaGlkZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAganEoJy5hZG1pbi1wYW5lbCcpLnNob3coJ25vcm1hbCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydCgn0JLRiyDQvdC1INC30LDRgNC10LPQuNGB0YLRgNC40YDQvtCy0LDQvdGLIScpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy/QktGL0YXQvtC0INC40Lcg0YHQuNGB0YLQtdC80YtcclxuICAgIGV4aXRTeXN0ZW06IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ0FjdGl2ZVVzZXInKTtcclxuICAgICAgICBqcSgnI2FwcGxpY2F0aW9uc0xpc3QnKS5oaWRlKCk7XHJcbiAgICAgICAganEoJyNsb2dJbl9mb3JtJykuc2hvdygpO1xyXG4gICAgICAgIGpxKCcuYXBwcycpLmh0bWwoJycpO1xyXG4gICAgICAgIGpxKCcjZW1wdHktbGlzdCcpLmhpZGUoKTtcclxuICAgICAgICBqcSgnLmFkbWluLXBhbmVsJykuaGlkZSgpO1xyXG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL9Cg0LXQs9C40YHRgtGA0LDRhtC40Y8g0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPXHJcbiAgICBjcmVhdGVVc2VyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmICgoL1xccysvLnRlc3QoanEoJyNyZWdfbmFtZScpLnZhbCgpKSkgfHwgKGpxKCcjcmVnX25hbWUnKS52YWwoKSA9PT0gJycpKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCfQktCy0LXQtNC40YLQtSwg0L/QvtC20LDQu9GD0LnRgdGC0LAsINC70L7Qs9C40L0hJyk7XHJcbiAgICAgICAgICAgIGpxKCcjcmVnX25hbWUnKS52YWwoJycpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB1c2VycyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJzJykpO1xyXG5cclxuICAgICAgICBpZiAodXNlcnMucGVyc29ucy5oYXNPd25Qcm9wZXJ0eSgganEoJyNyZWdfbmFtZScpLnZhbCgpICkpe1xyXG4gICAgICAgICAgICBhbGVydCgn0JTQsNC90L3Ri9C5INC/0L7Qu9GM0LfQvtCy0LDRgtGMINGD0LbQtSDRgdGD0YnQtdGB0YLQstGD0LXRgiEnKTtcclxuICAgICAgICAgICAganEoJyNyZWdfbmFtZScpLnZhbCgnJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1c2Vycy5wZXJzb25zW2pxKCcjcmVnX25hbWUnKS52YWwoKV0gPSAnQ2xpZW50JztcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXJzJyk7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VycycsIEpTT04uc3RyaW5naWZ5KHVzZXJzKSk7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdBY3RpdmVVc2VyJywganEoJyNyZWdfbmFtZScpLnZhbCgpKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChqcSgnI3JlZ19uYW1lJykudmFsKCkgIT09ICdBZG1pbicpe1xyXG4gICAgICAgICAgICAgICAganEoJy5hZG1pbi1wYW5lbCcpLmhpZGUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGpxKCcuYWRtaW4tcGFuZWwnKS5zaG93KCdub3JtYWwnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGFwcHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhcHBzJykpO1xyXG4gICAgICAgICAgICBhcHBzW2pxKCcjcmVnX25hbWUnKS52YWwoKV0gPSBbXTtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2FwcHMnKTtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FwcHMnLCBKU09OLnN0cmluZ2lmeShhcHBzKSk7XHJcblxyXG4gICAgICAgICAgICBqcSgnI3JlZ19uYW1lJykudmFsKCcnKTtcclxuICAgICAgICAgICAganEoJyNyZWdfZm9ybScpLmhpZGUoKTtcclxuICAgICAgICAgICAgc2hvd0FwcGxpY2F0aW9uTGlzdChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnQWN0aXZlVXNlcicpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8v0J/QvtC60LDQt9Cw0YLRjCDRhNC+0YDQvNGDINGB0L7Qt9C00LDQvdC40Y8g0LfQsNGP0LLQutC4XHJcbiAgICBzaG93Rm9ybUZvckFkZEFwcDogZnVuY3Rpb24oKXtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyDQstGL0LrQu9GO0Ydh0LXQvCDRgdGCYdC90LRh0YDRgtC90YPRjiDRgG/Qu9GMINGN0LvQtdC80LXQvdGCYVxyXG4gICAgICAgIGpxKCcjb3ZlcmxheScpLmZhZGVJbig0MDAsIC8vINGB0L1h0Ydh0LthINC/0Lth0LLQvW8g0L9v0Lph0LfRi9CyYdC10Lwg0YLQtdC80L3Rg9GOINC/b9C00Ltv0LbQutGDXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKCl7IC8vINC/b9GB0LvQtSDQstGL0L9v0LvQvdC10L3QuNGPINC/0YDQtdC00YrQuNC00YPRidC10LkgYdC90LjQvGHRhtC40LhcclxuICAgICAgICAgICAgICAgIGpxKCcjbW9kYWxfYWRkX2FwcCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdibG9jaycpIC8vINGD0LHQuNGAYdC10Lwg0YMg0Lxv0LRh0LvRjNC9b9CzbyBv0LrQvWEgZGlzcGxheTogbm9uZTtcclxuICAgICAgICAgICAgICAgICAgICAuYW5pbWF0ZSh7b3BhY2l0eTogMSwgdG9wOiAnNTAlJ30sIDIwMCk7IC8vINC/0Lth0LLQvW8g0L/RgNC40LFh0LLQu9GP0LXQvCDQv9GAb9C30YBh0YfQvW/RgdGC0Ywgb9C00L1v0LLRgNC10LzQtdC90L1vINGBbyDRgdGK0LXQt9C2YdC90LjQtdC8INCy0L3QuNC3XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cmFjdG9ycycpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHVzZXJzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcnMnKSk7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGtleSBpbiB1c2Vycy5Db250cmFjdG9ycyl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsLm9wdGlvbnNbc2VsLm9wdGlvbnMubGVuZ3RoXSA9IG5ldyBPcHRpb24oa2V5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v0KHQvtC30LTQsNC90LjQtSDQt9Cw0Y/QstC60LhcclxuICAgIGNyZWF0ZUFwcDogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgYXBwcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FwcHMnKSk7XHJcbiAgICAgICAgdmFyIEFwcGwgPSBDcmVhdGVBcHAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0FjdGl2ZVVzZXInKSwganEoJyNjb250cmFjdG9ycycpLnZhbCgpLCBqcSgnLmNvbW1lbnQnKS52YWwoKSxcclxuICAgICAgICAgICAganEoJyNwcmlvcml0eScpLnZhbCgpLCBqcSgnI2VzdGltYXRlZCcpLnZhbCgpLCBqcSgnI2RlYWRsaW5lJykudmFsKCksIDApO1xyXG5cclxuICAgICAgICBhcHBzW2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdBY3RpdmVVc2VyJyldW2FwcHNbbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0FjdGl2ZVVzZXInKV0ubGVuZ3RoXSA9IEFwcGw7XHJcbiAgICAgICAgYXBwcy5BZG1pblthcHBzLkFkbWluLmxlbmd0aF0gPSBBcHBsO1xyXG5cclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnYXBwcycpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhcHBzJywgSlNPTi5zdHJpbmdpZnkoYXBwcykpO1xyXG4gICAgICAgIGpxKCcjbW9kYWxfY2xvc2UnKS5jbGljaygpO1xyXG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL9CXYdC60YDRi9GC0LjQtSDQvG/QtGHQu9GM0L1v0LNvIG/QutC9YVxyXG4gICAgY2xvc2VNb2RhbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGpxKCcjbW9kYWxfYWRkX2FwcCcpXHJcbiAgICAgICAgICAgIC5hbmltYXRlKHtvcGFjaXR5OiAwLCB0b3A6ICc0NSUnfSwgMjAwLCAgLy8g0L/Qu2HQstC9byDQvNC10L3Rj9C10Lwg0L/RgG/Qt9GAYdGH0L1v0YHRgtGMINC9YSAwINC4IG/QtNC9b9Cy0YDQtdC80LXQvdC9byDQtNCy0LjQs2HQtdC8IG/QutC9byDQstCy0LXRgNGFXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpeyAvLyDQv2/RgdC70LUgYdC90LjQvGHRhtC40LhcclxuICAgICAgICAgICAgICAgICAgICBqcSh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpOyAvLyDQtNC10Lth0LXQvCDQtdC80YMgZGlzcGxheTogbm9uZTtcclxuICAgICAgICAgICAgICAgICAgICBqcSgnI292ZXJsYXknKS5mYWRlT3V0KDIwMCk7IC8vINGB0LrRgNGL0LJh0LXQvCDQv2/QtNC7b9C20LrRg1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIHZhciBzZWwyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyYWN0b3JzJyk7XHJcbiAgICAgICAgc2VsMi5vcHRpb25zLmxlbmd0aCA9IDA7XHJcbiAgICAgICAganEoJy5jb21tZW50JykudmFsKCcnKTtcclxuICAgICAgICBqcSgnI2VzdGltYXRlZCcpLnZhbCgnJyk7XHJcbiAgICAgICAganEoJyNkZWFkbGluZScpLnZhbCgnJyk7XHJcbiAgICAgICAganEoJy5lZGl0X3BhbmVsJykuaGlkZSgnbm9ybWFsJyk7XHJcbiAgICAgICAganEoJyNzdGF0dXNfdmFsdWUnKS52YWwoJycpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL9CU0L7QsdCw0LLQu9C10L3QuNC1INC40YHQv9C+0LvQvdC40YLQtdC70Y9cclxuICAgIGFkZENvbnRyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCgvXFxzKy8udGVzdChqcSgnI2NvbnRyLW5hbWUnKS52YWwoKSkpIHx8IChqcSgnI2NvbnRyLW5hbWUnKS52YWwoKSA9PT0gJycpKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCfQktCy0LXQtNC40YLQtSwg0L/QvtC20LDQu9GD0LnRgdGC0LAsINC70L7Qs9C40L0hJyk7XHJcbiAgICAgICAgICAgIGpxKCcjY29udHItbmFtZScpLnZhbCgnJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciB1c2VycyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJzJykpO1xyXG4gICAgICAgIGlmICh1c2Vyc1snQ29udHJhY3RvcnMnXSA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdXNlcnNbJ0NvbnRyYWN0b3JzJ10gPSB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh1c2Vycy5Db250cmFjdG9ycy5oYXNPd25Qcm9wZXJ0eShqcSgnI2NvbnRyLW5hbWUnKS52YWwoKSkpe1xyXG4gICAgICAgICAgICBhbGVydCgn0JTQsNC90L3Ri9C5INC40YHQv9C+0LvQvdC40YLQtdC70Ywg0YPQttC1INGB0YPRidC10YHRgtCy0YPQtdGCIScpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1c2Vycy5Db250cmFjdG9yc1tqcSgnI2NvbnRyLW5hbWUnKS52YWwoKV0gPSAwO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd1c2VycycpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VycycsIEpTT04uc3RyaW5naWZ5KHVzZXJzKSk7XHJcblxyXG4gICAgICAgIHZhciBhcHBzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYXBwcycpKTtcclxuICAgICAgICBhcHBzW2pxKCcjY29udHItbmFtZScpLnZhbCgpXSA9IFtdO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdhcHBzJyk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FwcHMnLCBKU09OLnN0cmluZ2lmeShhcHBzKSk7XHJcblxyXG4gICAgICAgIGFsZXJ0KCfQmNGB0L/QvtC70L3QuNGC0LXQu9GMINGD0YHQv9C10YjQvdC+INC00L7QsdCw0LLQu9C10L0hJyk7XHJcbiAgICAgICAganEoJy5mb3JtLWZvci1hZGQtY29udHInKS5zbGlkZVRvZ2dsZSgyMDApO1xyXG4gICAgICAgIGpxKCcjY29udHItbmFtZScpLnZhbCgnJyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v0J/QvtC60LDQt9Cw0YLRjCDRhNC+0YDQvNGDINGB0L7Qt9C00LDQvdC40Y8g0LjRgdC/0L7Qu9C90LjRgtC10LvRj1xyXG4gICAgc2hvd0Zvcm1Gb3JBZGRDb250cjogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgc2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyLWxpc3QnKTtcclxuICAgICAgICBzZWwub3B0aW9ucy5sZW5ndGggPSAwO1xyXG4gICAgICAgIHZhciB1c2VycyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJzJykpO1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIHVzZXJzLkNvbnRyYWN0b3JzKXtcclxuICAgICAgICAgICAgc2VsLm9wdGlvbnNbc2VsLm9wdGlvbnMubGVuZ3RoXSA9IG5ldyBPcHRpb24oa2V5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHBzLWxpc3QnKTtcclxuICAgICAgICBzZWwub3B0aW9ucy5sZW5ndGggPSAwO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBqcSgnLmFwcHMnKS5jaGlsZHJlbigpLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgc2VsLm9wdGlvbnNbc2VsLm9wdGlvbnMubGVuZ3RoXSA9IG5ldyBPcHRpb24oJ9CX0LDRj9Cy0LrQsCcgKyBpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAganEoJy5mb3JtLWZvci1tYWtlLWNvbnRyJykuc2xpZGVUb2dnbGUoMjAwKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/QvdCw0LfQvdCw0YfQtdC90LjQtSDQuNGB0L/QvtC70L3QuNGC0LvRj1xyXG4gICAgYXBwb2ludENvbnRyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYoanEoJyNjb250ci1saXN0JykudmFsKCkgPT09IG51bGwpe1xyXG4gICAgICAgICAgICBhbGVydCgn0J3QtdGCINC40YHQv9C+0LvQvdC40YLQtdC70LXQuSDQtNC70Y8g0L3QsNC30L3QsNGH0LXQvdC40Y8hJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoanEoJyNhcHBzLWxpc3QnKS52YWwoKSA9PT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGFsZXJ0KCfQndC10YIg0LfQsNGP0LLQvtC6INC00LvRjyDQvdCw0LfQvdCw0YfQtdC90LjRjyEnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHMgPSBqcSgnLmFwcDpjb250YWlucygnICsganEoJyNhcHBzLWxpc3QnKS52YWwoKSArICcpJykudGV4dCgpO1xyXG4gICAgICAgIHZhciBuYW1lID0gcy5zdWJzdHJpbmcoIHMuaW5kZXhPZign0JrQu9C40LXQvdGCOiAnKSArIDgsIHMuaW5kZXhPZign0JjRgdC/0L7Qu9C90LjRgtC10LvRjDonKSApO1xyXG4gICAgICAgIHZhciBpbmZvID0gcy5zdWJzdHJpbmcoIHMuaW5kZXhPZign0JjQvdGE0L7RgNC80LDRhtC40Y86ICcpICsgMTIsIHMuaW5kZXhPZign0J/RgNC40L7RgNC40YLQtdGCOicpICk7XHJcbiAgICAgICAgdmFyIGFwcF9uID0ganEoJyNhcHBzLWxpc3QnKS52YWwoKS5zdWJzdHJpbmcoNik7XHJcblxyXG4gICAgICAgIHZhciBhcHBzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYXBwcycpKTtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgYXBwc1tuYW1lXS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmIChpbmZvID09PSBhcHBzW25hbWVdW2ldLmluZm8pe1xyXG4gICAgICAgICAgICAgICAgYXBwc1tuYW1lXVtpXS5jb250cmFjdG9yID0ganEoJyNjb250ci1saXN0JykudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBhcHBzLkFkbWluW2FwcF9uLTFdLmNvbnRyYWN0b3IgPSBqcSgnI2NvbnRyLWxpc3QnKS52YWwoKTtcclxuICAgICAgICAgICAgICAgIGFwcHNbanEoJyNjb250ci1saXN0JykudmFsKCldW2FwcHNbanEoJyNjb250ci1saXN0JykudmFsKCldLmxlbmd0aF0gPSBuZXcgT2JqZWN0KGFwcHNbbmFtZV1baV0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdhcHBzJyk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FwcHMnLCBKU09OLnN0cmluZ2lmeShhcHBzKSk7XHJcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v0J/QvtC60LDQt9Cw0YLRjCDRhNC+0YDQvNGDINC00LvRjyDQuNC30LzQtdC90LXQvdC40Y8g0YHRgtCw0YLRg9GB0LAg0LfQsNGP0LLQutC4XHJcbiAgICBzaG93Rm9ybUZvckVkaXRTdGF0dXM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHMgPSBqcSh0aGlzKS5wYXJlbnQoKS50ZXh0KCk7XHJcbiAgICAgICAgLy92YXIgbmFtZSA9IHMuc3Vic3RyaW5nKCBzLmluZGV4T2YoJ9Ca0LvQuNC10L3RgjogJykgKyA4LCBzLmluZGV4T2YoJ9CY0YHQv9C+0LvQvdC40YLQtdC70Yw6JykgKTtcclxuICAgICAgICAvL3ZhciBpbmZvID0gcy5zdWJzdHJpbmcoIHMuaW5kZXhPZign0JjQvdGE0L7RgNC80LDRhtC40Y86ICcpICsgMTIsIHMuaW5kZXhPZign0J/RgNC40L7RgNC40YLQtdGCOicpICk7XHJcbiAgICAgICAgLy92YXIgYXBwX24gPSBwYXJzZUludChzLnN1YnN0cmluZyg2KSk7XHJcblxyXG4gICAgICAgIC8vdmFyIG9iaiA9IHtcclxuICAgICAgICAvL25hbWU6IHMuc3Vic3RyaW5nKCBzLmluZGV4T2YoJ9Ca0LvQuNC10L3RgjogJykgKyA4LCBzLmluZGV4T2YoJ9CY0YHQv9C+0LvQvdC40YLQtdC70Yw6JykgKSxcclxuICAgICAgICAvL2luZm86IHMuc3Vic3RyaW5nKCBzLmluZGV4T2YoJ9CY0L3RhNC+0YDQvNCw0YbQuNGPOiAnKSArIDEyLCBzLmluZGV4T2YoJ9Cf0YDQuNC+0YDQuNGC0LXRgjonKSApLFxyXG4gICAgICAgIC8vY29udHI6IHMuc3Vic3RyaW5nKCBzLmluZGV4T2YoJ9CY0YHQv9C+0LvQvdC40YLQtdC70Yw6ICcpICsgMTMsIHMuaW5kZXhPZign0JjQvdGE0L7RgNC80LDRhtC40Y86JykgKSxcclxuICAgICAgICAvL2FwcF9uOiBwYXJzZUludChzLnN1YnN0cmluZyg2KSlcclxuICAgICAgICAvL307XHJcbiAgICAgICAgLy9sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGVtcG9yYXJ5JywgSlNPTi5zdHJpbmdpZnkob2JqKSk7XHJcblxyXG4gICAgICAgIGpxKCcjc3RhdHVzX3ZhbHVlJykudmFsKCBwYXJzZUZsb2F0KHMuc3Vic3RyaW5nKHMuaW5kZXhPZign0JPQvtGC0L7QstC90L7RgdGC0Yw6ICcpICsgMTIsIHMuaW5kZXhPZign0KDQtdC00LDQutGC0LjRgNC+0LLQsNGC0YwnKSkpICk7XHJcbiAgICAgICAganEoJyNvdmVybGF5JykuZmFkZUluKCdub3JtYWwnKTtcclxuICAgICAgICBqcSgnLmVkaXRfcGFuZWwnKS5zaG93KCdub3JtYWwnKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/QuNC30LzQtdC90LjRgtGMINGB0YLQsNGC0YPRgSDQt9Cw0Y/QstC60LhcclxuICAgIGNoYW5nZVN0YXR1czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzdGF0dXMgPSBwYXJzZUZsb2F0KGpxKCcjc3RhdHVzX3ZhbHVlJykudmFsKCkpO1xyXG5cclxuICAgICAgICBpZiAoc3RhdHVzID4gMTAwKSBzdGF0dXMgPSAxMDA7XHJcblxyXG4gICAgICAgIGlmIChzdGF0dXMgPiAwKXtcclxuICAgICAgICAgICAgLy8gdmFyIG9iaiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RlbXBvcmFyeScpKTtcclxuICAgICAgICAgICAgLy8gdmFyIGFwcHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhcHBzJykpO1xyXG5cclxuICAgICAgICAgICAgLy8gZm9yKHZhciBpID0gMDsgaSA8IGFwcHNbb2JqLm5hbWVdLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgLy8gaWYgKG9iai5pbmZvID09PSBhcHBzW29iai5uYW1lXVtpXS5pbmZvKXtcclxuICAgICAgICAgICAgLy8gYXBwc1tvYmoubmFtZV1baV0ucmVhZHkgPSBzdGF0dXMgKyAnJSc7XHJcbiAgICAgICAgICAgIC8vIGFwcHMuQWRtaW5bb2JqLmFwcF9uLTFdLnJlYWR5ID0gc3RhdHVzICsgJyUnO1xyXG4gICAgICAgICAgICAvLyBpZiAoYXBwc1tvYmouY29udHJdICE9PSB1bmRlZmluZWQpIGFwcHNbb2JqLmNvbnRyXSA9IHN0YXR1cyArICclJztcclxuICAgICAgICAgICAgLy8gYnJlYWs7XHJcbiAgICAgICAgICAgIC8vICB9XHJcbiAgICAgICAgICAgIC8vICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBqcSgnLmVkaXRfcGFuZWwnKS5oaWRlKCdub3JtYWwnKTtcclxuICAgICAgICBqcSgnI3N0YXR1c192YWx1ZScpLnZhbCgnJyk7XHJcbiAgICAgICAganEoJyNvdmVybGF5JykuZmFkZU91dCgnbm9ybWFsJyk7XHJcbiAgICAgICAgLy9sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndGVtcG9yYXJ5Jyk7XHJcbiAgICAgICAgLy9sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnYXBwcycpO1xyXG4gICAgICAgIC8vbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FwcHMnLCBKU09OLnN0cmluZ2lmeShhcHBzKSk7XHJcbiAgICAgICAgLy8gbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuXHJcbi8v0JrQvtC90YHRgtGA0YPQutGC0L7RgCDQvtCx0YrQtdC60YLQsCDQt9Cw0Y/QstC60LhcclxuZnVuY3Rpb24gQ3JlYXRlQXBwKGNsaWVudCwgY29udHJhY3RvciwgaW5mbywgcHJpb3JpdHksIGVzdGltYXRlZCwgZGVhZGxpbmUsIHJlYWR5KXtcclxuICAgIGlmKCEgKHRoaXMgaW5zdGFuY2VvZiBDcmVhdGVBcHApKSB7cmV0dXJuIG5ldyBDcmVhdGVBcHAoY2xpZW50LCBjb250cmFjdG9yLCBpbmZvLCBwcmlvcml0eSwgZXN0aW1hdGVkLCBkZWFkbGluZSwgcmVhZHkpO31cclxuICAgIHRoaXMuY2xpZW50ID0gY2xpZW50O1xyXG4gICAgdGhpcy5jb250cmFjdG9yID0gY29udHJhY3RvcjtcclxuICAgIHRoaXMuaW5mbyA9IGluZm87XHJcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XHJcbiAgICB0aGlzLmVzdGltYXRlZCA9IGVzdGltYXRlZDtcclxuICAgIHRoaXMuZGVhZGxpbmUgPSBkZWFkbGluZTtcclxuICAgIHRoaXMucmVhZHkgPSByZWFkeSArICclJztcclxufVxyXG5cclxuXHJcbi8v0L/QvtC60LDQt9Cw0YLRjCDRgdC/0LjRgdC+0Log0LfQsNGP0LLQvtC6XHJcbmZ1bmN0aW9uIHNob3dBcHBsaWNhdGlvbkxpc3QodXNlcil7XHJcbiAgICBqcSgnI2FwcGxpY2F0aW9uc0xpc3QgPiAubGlzdC10aXRsZSA+IC51c2VyLW5hbWUnKS50ZXh0KHVzZXIpO1xyXG5cclxuICAgIHZhciBhcHBzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYXBwcycpKTtcclxuXHJcbiAgICBpZiAoYXBwc1t1c2VyXS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICBqcSgnI2VtcHR5LWxpc3QnKS5zaG93KCk7XHJcbiAgICAgICAganEoJy5hcHBzJykuaGlkZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgY29kZSA9IFwiXCI7XHJcbiAgICAgICAgdmFyIGFyciA9IGFwcHNbdXNlcl07XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBjb2RlICs9IFwiPGRpdiBjbGFzcz0nYXBwJz48ZGl2IGNsYXNzPSdhcHAtdGl0bGUnPtCX0LDRj9Cy0LrQsFwiICsgKGkrMSkgKyBcIjwvZGl2PlwiICtcclxuICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nYXBwLWluZm8nPtCa0LvQuNC10L3RgjogXCIgKyBhcnJbaV0uY2xpZW50ICsgXCI8YnI+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCLQmNGB0L/QvtC70L3QuNGC0LXQu9GMOiBcIiArIGFycltpXS5jb250cmFjdG9yICsgXCI8YnI+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCLQmNC90YTQvtGA0LzQsNGG0LjRjzogXCIgKyBhcnJbaV0uaW5mbyArIFwiPGJyPlwiICtcclxuICAgICAgICAgICAgICAgIFwi0J/RgNC40L7RgNC40YLQtdGCOiBcIiArIGFycltpXS5wcmlvcml0eSArIFwiPGJyPlwiICtcclxuICAgICAgICAgICAgICAgIFwi0J7QttC40LTQsNC10LzQvtC1INCy0YDQtdC80Y8g0LjRgdC/0L7Qu9C90LXQvdC40Y86IFwiICsgYXJyW2ldLmVzdGltYXRlZCArIFwiINC00L0uPGJyPlwiICtcclxuICAgICAgICAgICAgICAgIFwi0JrRgNCw0LnQvdC40LUg0YHRgNC+0LrQuDogXCIgKyBhcnJbaV0uZGVhZGxpbmUgKyBcIiDQtNC9Ljxicj5cIiArXHJcbiAgICAgICAgICAgICAgICBcItCT0L7RgtC+0LLQvdC+0YHRgtGMOiBcIiArIGFycltpXS5yZWFkeSAgK1xyXG4gICAgICAgICAgICAgICAgXCI8YnI+PGJ1dHRvbiBjbGFzcz0nZWRpdF9zdGF0dXMnPtCg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMINGB0YLQsNGC0YPRgSDQt9Cw0Y/QstC60Lg8L2J1dHRvbj5cIitcclxuICAgICAgICAgICAgICAgIFwiPC9kaXY+PC9kaXY+XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGpxKCcubGlzdC1jb250ZW50ID4gLmFwcHMnKS5odG1sKGNvZGUpO1xyXG5cclxuICAgICAgICBqcSgnLmFwcHMnKS5zaG93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHVzZXJzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcnMnKSk7XHJcbiAgICBpZiAodXNlcnMucGVyc29uc1t1c2VyXSAhPT0gJ0NsaWVudCcgJiYgdXNlcnMucGVyc29uc1t1c2VyXSAhPT0gJ0FkbWluaXN0cmF0b3InKXtcclxuICAgICAgICBqcSgnI2FkZC1hcHAnKS5oaWRlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGpxKCcjYWRkLWFwcCcpLnNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBqcSgnI2FwcGxpY2F0aW9uc0xpc3QnKS5mYWRlSW4oJ25vcm1hbCcpOy8vYWRkLWFwcFxyXG59XHJcblxyXG4gLypcclxuLy/QktGF0L7QtCDQsiDRgdC40YHRgtC10LzRg1xyXG5mdW5jdGlvbiBlbnRlclN5c3RlbSgpe1xyXG4gICAgaWYgKCgvXFxzKy8udGVzdChqcSgnI2xvZ2luX25hbWUnKS52YWwoKSkpIHx8IChqcSgnI2xvZ2luX25hbWUnKS52YWwoKSA9PT0gJycpKSB7XHJcbiAgICAgICAgYWxlcnQoJ9CS0LLQtdC00LjRgtC1LCDQv9C+0LbQsNC70YPQudGB0YLQsCwg0LvQvtCz0LjQvSEnKTtcclxuICAgICAgICBqcSgnI2xvZ2luX25hbWUnKS52YWwoJycpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciB1c2VycyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJzJykpO1xyXG5cclxuICAgIGlmICggdXNlcnMucGVyc29ucy5oYXNPd25Qcm9wZXJ0eSgganEoJyNsb2dpbl9uYW1lJykudmFsKCkgKSB8fCB1c2Vycy5Db250cmFjdG9ycy5oYXNPd25Qcm9wZXJ0eSgganEoJyNsb2dpbl9uYW1lJykudmFsKCkgKSApe1xyXG5cclxuICAgICAgICBqcSgnI2xvZ0luX2Zvcm0nKS5oaWRlKCk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0FjdGl2ZVVzZXInLCBqcSgnI2xvZ2luX25hbWUnKS52YWwoKSk7XHJcbiAgICAgICAgc2hvd0FwcGxpY2F0aW9uTGlzdChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnQWN0aXZlVXNlcicpKTtcclxuXHJcbiAgICAgICAganEoJyNsb2dpbl9uYW1lJykudmFsKCcnKTtcclxuXHJcbiAgICAgICAgaWYgKGpxKCcjbG9naW5fbmFtZScpLnZhbCgpICE9PSAnQWRtaW4nKXtcclxuICAgICAgICAgICAganEoJy5hZG1pbi1wYW5lbCcpLmhpZGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBqcSgnLmFkbWluLXBhbmVsJykuc2hvdygnbm9ybWFsJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoJ9CS0Ysg0L3QtSDQt9Cw0YDQtdCz0LjRgdGC0YDQuNGA0L7QstCw0L3RiyEnKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8v0JLRi9GF0L7QtCDQuNC3INGB0LjRgdGC0LXQvNGLXHJcbmZ1bmN0aW9uIGV4aXRTeXN0ZW0oKXtcclxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdBY3RpdmVVc2VyJyk7XHJcbiAgICBqcSgnI2FwcGxpY2F0aW9uc0xpc3QnKS5oaWRlKCk7XHJcbiAgICBqcSgnI2xvZ0luX2Zvcm0nKS5zaG93KCk7XHJcbiAgICBqcSgnLmFwcHMnKS5odG1sKCcnKTtcclxuICAgIGpxKCcjZW1wdHktbGlzdCcpLmhpZGUoKTtcclxuICAgIGpxKCcuYWRtaW4tcGFuZWwnKS5oaWRlKCk7XHJcbiAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxufVxyXG5cclxuXHJcbi8v0KDQtdCz0LjRgdGC0YDQsNGG0LjRjyDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y9cclxuZnVuY3Rpb24gY3JlYXRlVXNlcigpe1xyXG4gICAgaWYgKCgvXFxzKy8udGVzdChqcSgnI3JlZ19uYW1lJykudmFsKCkpKSB8fCAoanEoJyNyZWdfbmFtZScpLnZhbCgpID09PSAnJykpIHtcclxuICAgICAgICBhbGVydCgn0JLQstC10LTQuNGC0LUsINC/0L7QttCw0LvRg9C50YHRgtCwLCDQu9C+0LPQuNC9IScpO1xyXG4gICAgICAgIGpxKCcjcmVnX25hbWUnKS52YWwoJycpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciB1c2VycyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJzJykpO1xyXG5cclxuICAgIGlmICh1c2Vycy5wZXJzb25zLmhhc093blByb3BlcnR5KCBqcSgnI3JlZ19uYW1lJykudmFsKCkgKSl7XHJcbiAgICAgICAgYWxlcnQoJ9CU0LDQvdC90YvQuSDQv9C+0LvRjNC30L7QstCw0YLRjCDRg9C20LUg0YHRg9GJ0LXRgdGC0LLRg9C10YIhJyk7XHJcbiAgICAgICAganEoJyNyZWdfbmFtZScpLnZhbCgnJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB1c2Vycy5wZXJzb25zW2pxKCcjcmVnX25hbWUnKS52YWwoKV0gPSAnQ2xpZW50JztcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndXNlcnMnKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcnMnLCBKU09OLnN0cmluZ2lmeSh1c2VycykpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdBY3RpdmVVc2VyJywganEoJyNyZWdfbmFtZScpLnZhbCgpKTtcclxuXHJcbiAgICAgICAgaWYgKGpxKCcjcmVnX25hbWUnKS52YWwoKSAhPT0gJ0FkbWluJyl7XHJcbiAgICAgICAgICAgIGpxKCcuYWRtaW4tcGFuZWwnKS5oaWRlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAganEoJy5hZG1pbi1wYW5lbCcpLnNob3coJ25vcm1hbCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGFwcHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhcHBzJykpO1xyXG4gICAgICAgIGFwcHNbanEoJyNyZWdfbmFtZScpLnZhbCgpXSA9IFtdO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdhcHBzJyk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FwcHMnLCBKU09OLnN0cmluZ2lmeShhcHBzKSk7XHJcblxyXG4gICAgICAgIGpxKCcjcmVnX25hbWUnKS52YWwoJycpO1xyXG4gICAgICAgIGpxKCcjcmVnX2Zvcm0nKS5oaWRlKCk7XHJcbiAgICAgICAgc2hvd0FwcGxpY2F0aW9uTGlzdChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnQWN0aXZlVXNlcicpKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8v0J/QvtC60LDQt9Cw0YLRjCDRhNC+0YDQvNGDINGB0L7Qt9C00LDQvdC40Y8g0LfQsNGP0LLQutC4XHJcbmZ1bmN0aW9uIHNob3dGb3JtRm9yQWRkQXBwKCl7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyDQstGL0LrQu9GO0Ydh0LXQvCDRgdGCYdC90LRh0YDRgtC90YPRjiDRgG/Qu9GMINGN0LvQtdC80LXQvdGCYVxyXG4gICAganEoJyNvdmVybGF5JykuZmFkZUluKDQwMCwgLy8g0YHQvWHRh2HQu2Eg0L/Qu2HQstC9byDQv2/QumHQt9GL0LJh0LXQvCDRgtC10LzQvdGD0Y4g0L9v0LTQu2/QttC60YNcclxuICAgICAgICBmdW5jdGlvbigpeyAvLyDQv2/RgdC70LUg0LLRi9C/b9C70L3QtdC90LjRjyDQv9GA0LXQtNGK0LjQtNGD0YnQtdC5IGHQvdC40Lxh0YbQuNC4XHJcbiAgICAgICAgICAgIGpxKCcjbW9kYWxfYWRkX2FwcCcpXHJcbiAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJykgLy8g0YPQsdC40YBh0LXQvCDRgyDQvG/QtGHQu9GM0L1v0LNvIG/QutC9YSBkaXNwbGF5OiBub25lO1xyXG4gICAgICAgICAgICAgICAgLmFuaW1hdGUoe29wYWNpdHk6IDEsIHRvcDogJzUwJSd9LCAyMDApOyAvLyDQv9C7YdCy0L1vINC/0YDQuNCxYdCy0LvRj9C10Lwg0L/RgG/Qt9GAYdGH0L1v0YHRgtGMIG/QtNC9b9Cy0YDQtdC80LXQvdC9byDRgW8g0YHRitC10LfQtmHQvdC40LXQvCDQstC90LjQt1xyXG5cclxuICAgICAgICAgICAgdmFyIHNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cmFjdG9ycycpO1xyXG4gICAgICAgICAgICB2YXIgdXNlcnMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VycycpKTtcclxuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gdXNlcnMuQ29udHJhY3RvcnMpe1xyXG4gICAgICAgICAgICAgICAgc2VsLm9wdGlvbnNbc2VsLm9wdGlvbnMubGVuZ3RoXSA9IG5ldyBPcHRpb24oa2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG59XHJcblxyXG5cclxuLy/QodC+0LfQtNCw0L3QuNC1INC30LDRj9Cy0LrQuFxyXG5mdW5jdGlvbiBjcmVhdGVBcHAoKXtcclxuICAgIHZhciBhcHBzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYXBwcycpKTtcclxuICAgIHZhciBBcHBsID0gQ3JlYXRlQXBwKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdBY3RpdmVVc2VyJyksIGpxKCcjY29udHJhY3RvcnMnKS52YWwoKSwganEoJy5jb21tZW50JykudmFsKCksXHJcbiAgICAgICAganEoJyNwcmlvcml0eScpLnZhbCgpLCBqcSgnI2VzdGltYXRlZCcpLnZhbCgpLCBqcSgnI2RlYWRsaW5lJykudmFsKCksIDApO1xyXG5cclxuICAgIGFwcHNbbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0FjdGl2ZVVzZXInKV1bYXBwc1tsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnQWN0aXZlVXNlcicpXS5sZW5ndGhdID0gQXBwbDtcclxuICAgIGFwcHMuQWRtaW5bYXBwcy5BZG1pbi5sZW5ndGhdID0gQXBwbDtcclxuXHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnYXBwcycpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FwcHMnLCBKU09OLnN0cmluZ2lmeShhcHBzKSk7XHJcbiAgICBqcSgnI21vZGFsX2Nsb3NlJykuY2xpY2soKTtcclxuICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG59XHJcblxyXG5cclxuLy/Ql2HQutGA0YvRgtC40LUg0Lxv0LRh0LvRjNC9b9CzbyBv0LrQvWFcclxuZnVuY3Rpb24gY2xvc2VNb2RhbCgpe1xyXG4gICAganEoJyNtb2RhbF9hZGRfYXBwJylcclxuICAgICAgICAuYW5pbWF0ZSh7b3BhY2l0eTogMCwgdG9wOiAnNDUlJ30sIDIwMCwgIC8vINC/0Lth0LLQvW8g0LzQtdC90Y/QtdC8INC/0YBv0LfRgGHRh9C9b9GB0YLRjCDQvWEgMCDQuCBv0LTQvW/QstGA0LXQvNC10L3QvW8g0LTQstC40LNh0LXQvCBv0LrQvW8g0LLQstC10YDRhVxyXG4gICAgICAgICAgICBmdW5jdGlvbigpeyAvLyDQv2/RgdC70LUgYdC90LjQvGHRhtC40LhcclxuICAgICAgICAgICAgICAgIGpxKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7IC8vINC00LXQu2HQtdC8INC10LzRgyBkaXNwbGF5OiBub25lO1xyXG4gICAgICAgICAgICAgICAganEoJyNvdmVybGF5JykuZmFkZU91dCgyMDApOyAvLyDRgdC60YDRi9CyYdC10Lwg0L9v0LTQu2/QttC60YNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB2YXIgc2VsMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cmFjdG9ycycpO1xyXG4gICAgc2VsMi5vcHRpb25zLmxlbmd0aCA9IDA7XHJcbiAgICBqcSgnLmNvbW1lbnQnKS52YWwoJycpO1xyXG4gICAganEoJyNlc3RpbWF0ZWQnKS52YWwoJycpO1xyXG4gICAganEoJyNkZWFkbGluZScpLnZhbCgnJyk7XHJcbiAgICBqcSgnLmVkaXRfcGFuZWwnKS5oaWRlKCdub3JtYWwnKTtcclxuICAgIGpxKCcjc3RhdHVzX3ZhbHVlJykudmFsKCcnKTtcclxufVxyXG5cclxuXHJcbi8v0JTQvtCx0LDQstC70LXQvdC40LUg0LjRgdC/0L7Qu9C90LjRgtC10LvRj1xyXG5mdW5jdGlvbiBhZGRDb250cigpe1xyXG4gICAgaWYgKCgvXFxzKy8udGVzdChqcSgnI2NvbnRyLW5hbWUnKS52YWwoKSkpIHx8IChqcSgnI2NvbnRyLW5hbWUnKS52YWwoKSA9PT0gJycpKSB7XHJcbiAgICAgICAgYWxlcnQoJ9CS0LLQtdC00LjRgtC1LCDQv9C+0LbQsNC70YPQudGB0YLQsCwg0LvQvtCz0LjQvSEnKTtcclxuICAgICAgICBqcSgnI2NvbnRyLW5hbWUnKS52YWwoJycpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgdXNlcnMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VycycpKTtcclxuICAgIGlmICh1c2Vyc1snQ29udHJhY3RvcnMnXSA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICB1c2Vyc1snQ29udHJhY3RvcnMnXSA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh1c2Vycy5Db250cmFjdG9ycy5oYXNPd25Qcm9wZXJ0eShqcSgnI2NvbnRyLW5hbWUnKS52YWwoKSkpe1xyXG4gICAgICAgIGFsZXJ0KCfQlNCw0L3QvdGL0Lkg0LjRgdC/0L7Qu9C90LjRgtC10LvRjCDRg9C20LUg0YHRg9GJ0LXRgdGC0LLRg9C10YIhJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHVzZXJzLkNvbnRyYWN0b3JzW2pxKCcjY29udHItbmFtZScpLnZhbCgpXSA9IDA7XHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndXNlcnMnKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VycycsIEpTT04uc3RyaW5naWZ5KHVzZXJzKSk7XHJcblxyXG4gICAgdmFyIGFwcHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhcHBzJykpO1xyXG4gICAgYXBwc1tqcSgnI2NvbnRyLW5hbWUnKS52YWwoKV0gPSBbXTtcclxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdhcHBzJyk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYXBwcycsIEpTT04uc3RyaW5naWZ5KGFwcHMpKTtcclxuXHJcbiAgICBhbGVydCgn0JjRgdC/0L7Qu9C90LjRgtC10LvRjCDRg9GB0L/QtdGI0L3QviDQtNC+0LHQsNCy0LvQtdC9IScpO1xyXG4gICAganEoJy5mb3JtLWZvci1hZGQtY29udHInKS5zbGlkZVRvZ2dsZSgyMDApO1xyXG4gICAganEoJyNjb250ci1uYW1lJykudmFsKCcnKTtcclxufVxyXG5cclxuXHJcbi8v0J/QvtC60LDQt9Cw0YLRjCDRhNC+0YDQvNGDINGB0L7Qt9C00LDQvdC40Y8g0LjRgdC/0L7Qu9C90LjRgtC10LvRj1xyXG5mdW5jdGlvbiBzaG93Rm9ybUZvckFkZENvbnRyKCl7XHJcbiAgICB2YXIgc2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyLWxpc3QnKTtcclxuICAgIHNlbC5vcHRpb25zLmxlbmd0aCA9IDA7XHJcbiAgICB2YXIgdXNlcnMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VycycpKTtcclxuICAgIGZvcih2YXIga2V5IGluIHVzZXJzLkNvbnRyYWN0b3JzKXtcclxuICAgICAgICBzZWwub3B0aW9uc1tzZWwub3B0aW9ucy5sZW5ndGhdID0gbmV3IE9wdGlvbihrZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHBzLWxpc3QnKTtcclxuICAgIHNlbC5vcHRpb25zLmxlbmd0aCA9IDA7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPD0ganEoJy5hcHBzJykuY2hpbGRyZW4oKS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgc2VsLm9wdGlvbnNbc2VsLm9wdGlvbnMubGVuZ3RoXSA9IG5ldyBPcHRpb24oJ9CX0LDRj9Cy0LrQsCcgKyBpKTtcclxuICAgIH1cclxuICAgIGpxKCcuZm9ybS1mb3ItbWFrZS1jb250cicpLnNsaWRlVG9nZ2xlKDIwMCk7XHJcbn1cclxuXHJcblxyXG4vL9C90LDQt9C90LDRh9C10L3QuNC1INC40YHQv9C+0LvQvdC40YLQu9GPXHJcbmZ1bmN0aW9uIGFwcG9pbnRDb250cigpe1xyXG4gICAgaWYoanEoJyNjb250ci1saXN0JykudmFsKCkgPT09IG51bGwpe1xyXG4gICAgICAgIGFsZXJ0KCfQndC10YIg0LjRgdC/0L7Qu9C90LjRgtC10LvQtdC5INC00LvRjyDQvdCw0LfQvdCw0YfQtdC90LjRjyEnKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZihqcSgnI2FwcHMtbGlzdCcpLnZhbCgpID09PSBudWxsKXtcclxuICAgICAgICBhbGVydCgn0J3QtdGCINC30LDRj9Cy0L7QuiDQtNC70Y8g0L3QsNC30L3QsNGH0LXQvdC40Y8hJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzID0ganEoJy5hcHA6Y29udGFpbnMoJyArIGpxKCcjYXBwcy1saXN0JykudmFsKCkgKyAnKScpLnRleHQoKTtcclxuICAgIHZhciBuYW1lID0gcy5zdWJzdHJpbmcoIHMuaW5kZXhPZign0JrQu9C40LXQvdGCOiAnKSArIDgsIHMuaW5kZXhPZign0JjRgdC/0L7Qu9C90LjRgtC10LvRjDonKSApO1xyXG4gICAgdmFyIGluZm8gPSBzLnN1YnN0cmluZyggcy5pbmRleE9mKCfQmNC90YTQvtGA0LzQsNGG0LjRjzogJykgKyAxMiwgcy5pbmRleE9mKCfQn9GA0LjQvtGA0LjRgtC10YI6JykgKTtcclxuICAgIHZhciBhcHBfbiA9IGpxKCcjYXBwcy1saXN0JykudmFsKCkuc3Vic3RyaW5nKDYpO1xyXG5cclxuICAgIHZhciBhcHBzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYXBwcycpKTtcclxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBhcHBzW25hbWVdLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICBpZiAoaW5mbyA9PT0gYXBwc1tuYW1lXVtpXS5pbmZvKXtcclxuICAgICAgICAgICAgYXBwc1tuYW1lXVtpXS5jb250cmFjdG9yID0ganEoJyNjb250ci1saXN0JykudmFsKCk7XHJcbiAgICAgICAgICAgIGFwcHMuQWRtaW5bYXBwX24tMV0uY29udHJhY3RvciA9IGpxKCcjY29udHItbGlzdCcpLnZhbCgpO1xyXG4gICAgICAgICAgICBhcHBzW2pxKCcjY29udHItbGlzdCcpLnZhbCgpXVthcHBzW2pxKCcjY29udHItbGlzdCcpLnZhbCgpXS5sZW5ndGhdID0gbmV3IE9iamVjdChhcHBzW25hbWVdW2ldKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdhcHBzJyk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYXBwcycsIEpTT04uc3RyaW5naWZ5KGFwcHMpKTtcclxuICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG59XHJcblxyXG5cclxuLy/Qn9C+0LrQsNC30LDRgtGMINGE0L7RgNC80YMg0LTQu9GPINC40LfQvNC10L3QtdC90LjRjyDRgdGC0LDRgtGD0YHQsCDQt9Cw0Y/QstC60LhcclxuZnVuY3Rpb24gc2hvd0Zvcm1Gb3JFZGl0U3RhdHVzKCl7XHJcbiAgICB2YXIgcyA9IGpxKHRoaXMpLnBhcmVudCgpLnRleHQoKTtcclxuICAgIC8vdmFyIG5hbWUgPSBzLnN1YnN0cmluZyggcy5pbmRleE9mKCfQmtC70LjQtdC90YI6ICcpICsgOCwgcy5pbmRleE9mKCfQmNGB0L/QvtC70L3QuNGC0LXQu9GMOicpICk7XHJcbiAgICAgLy92YXIgaW5mbyA9IHMuc3Vic3RyaW5nKCBzLmluZGV4T2YoJ9CY0L3RhNC+0YDQvNCw0YbQuNGPOiAnKSArIDEyLCBzLmluZGV4T2YoJ9Cf0YDQuNC+0YDQuNGC0LXRgjonKSApO1xyXG4gICAgIC8vdmFyIGFwcF9uID0gcGFyc2VJbnQocy5zdWJzdHJpbmcoNikpO1xyXG5cclxuICAgIC8vdmFyIG9iaiA9IHtcclxuICAgICAvL25hbWU6IHMuc3Vic3RyaW5nKCBzLmluZGV4T2YoJ9Ca0LvQuNC10L3RgjogJykgKyA4LCBzLmluZGV4T2YoJ9CY0YHQv9C+0LvQvdC40YLQtdC70Yw6JykgKSxcclxuICAgICAvL2luZm86IHMuc3Vic3RyaW5nKCBzLmluZGV4T2YoJ9CY0L3RhNC+0YDQvNCw0YbQuNGPOiAnKSArIDEyLCBzLmluZGV4T2YoJ9Cf0YDQuNC+0YDQuNGC0LXRgjonKSApLFxyXG4gICAgIC8vY29udHI6IHMuc3Vic3RyaW5nKCBzLmluZGV4T2YoJ9CY0YHQv9C+0LvQvdC40YLQtdC70Yw6ICcpICsgMTMsIHMuaW5kZXhPZign0JjQvdGE0L7RgNC80LDRhtC40Y86JykgKSxcclxuICAgICAvL2FwcF9uOiBwYXJzZUludChzLnN1YnN0cmluZyg2KSlcclxuICAgICAvL307XHJcbiAgICAgLy9sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGVtcG9yYXJ5JywgSlNPTi5zdHJpbmdpZnkob2JqKSk7XHJcblxyXG4gICAganEoJyNzdGF0dXNfdmFsdWUnKS52YWwoIHBhcnNlRmxvYXQocy5zdWJzdHJpbmcocy5pbmRleE9mKCfQk9C+0YLQvtCy0L3QvtGB0YLRjDogJykgKyAxMiwgcy5pbmRleE9mKCfQoNC10LTQsNC60YLQuNGA0L7QstCw0YLRjCcpKSkgKTtcclxuICAgIGpxKCcjb3ZlcmxheScpLmZhZGVJbignbm9ybWFsJyk7XHJcbiAgICBqcSgnLmVkaXRfcGFuZWwnKS5zaG93KCdub3JtYWwnKTtcclxufVxyXG5cclxuXHJcbi8v0LjQt9C80LXQvdC40YLRjCDRgdGC0LDRgtGD0YEg0LfQsNGP0LLQutC4XHJcbmZ1bmN0aW9uIGNoYW5nZVN0YXR1cygpe1xyXG4gICAgdmFyIHN0YXR1cyA9IHBhcnNlRmxvYXQoanEoJyNzdGF0dXNfdmFsdWUnKS52YWwoKSk7XHJcblxyXG4gICAgaWYgKHN0YXR1cyA+IDEwMCkgc3RhdHVzID0gMTAwO1xyXG5cclxuICAgIGlmIChzdGF0dXMgPiAwKXtcclxuICAgICAgIC8vIHZhciBvYmogPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0ZW1wb3JhcnknKSk7XHJcbiAgICAgICAgLy8gdmFyIGFwcHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhcHBzJykpO1xyXG5cclxuICAgICAgICAvLyBmb3IodmFyIGkgPSAwOyBpIDwgYXBwc1tvYmoubmFtZV0ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgIC8vIGlmIChvYmouaW5mbyA9PT0gYXBwc1tvYmoubmFtZV1baV0uaW5mbyl7XHJcbiAgICAgICAgLy8gYXBwc1tvYmoubmFtZV1baV0ucmVhZHkgPSBzdGF0dXMgKyAnJSc7XHJcbiAgICAgICAgLy8gYXBwcy5BZG1pbltvYmouYXBwX24tMV0ucmVhZHkgPSBzdGF0dXMgKyAnJSc7XHJcbiAgICAgICAgLy8gaWYgKGFwcHNbb2JqLmNvbnRyXSAhPT0gdW5kZWZpbmVkKSBhcHBzW29iai5jb250cl0gPSBzdGF0dXMgKyAnJSc7XHJcbiAgICAgICAgLy8gYnJlYWs7XHJcbiAgICAgICAvLyAgfVxyXG4gICAgICAgLy8gIH1cclxuICAgIH1cclxuXHJcbiAgICBqcSgnLmVkaXRfcGFuZWwnKS5oaWRlKCdub3JtYWwnKTtcclxuICAgIGpxKCcjc3RhdHVzX3ZhbHVlJykudmFsKCcnKTtcclxuICAgIGpxKCcjb3ZlcmxheScpLmZhZGVPdXQoJ25vcm1hbCcpO1xyXG4gICAgLy9sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndGVtcG9yYXJ5Jyk7XHJcbiAgICAgLy9sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnYXBwcycpO1xyXG4gICAgIC8vbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FwcHMnLCBKU09OLnN0cmluZ2lmeShhcHBzKSk7XHJcbiAgICAvLyBsb2NhdGlvbi5yZWxvYWQoKTtcclxufSovXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogZnVuY19saXN0LmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzlFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBRUE7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQXJRQTtBQUNBOztBQTBRQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsiLCJzb3VyY2VSb290IjoiIn0=