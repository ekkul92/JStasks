;
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

var jq = jQuery.noConflict();

function showApplicationList(user){
    jq('#applicationsList > .list-title > .user-name').text(user);

    var apps = JSON.parse(localStorage.getItem('apps'));

    if (apps[user].length === 0) {
        jq('#empty-list').show();
        jq('.apps').hide();
    } else {
        var code = "";
        var arr = apps[user];
        for (var i = 0; i < arr.length; i++){
            code += "<div class='app'><div class='app-title'>Заявка" + (i+1) + "</div>" +
                    "<div class='app-info'>Клиент: " + arr[i].client + "<br>" +
                    "Исполнитель: " + arr[i].contractor + "<br>" +
                    "Информация: " + arr[i].info + "<br>" +
                    "Приоритет: " + arr[i].priority + "<br>" +
                    "Ожидаемое время исполнения: " + arr[i].estimated + " дн.<br>" +
                    "Крайние сроки: " + arr[i].deadline + " дн.<br>" +
                    "Готовность: " + arr[i].ready  +
                    "<br><button class='edit_status'>Редактировать статус заявки</button>"+
                    "</div></div>";
        }
        jq('.list-content > .apps').html(code);

        jq('.apps').show();
    }

    var users = JSON.parse(localStorage.getItem('users'));
    if (users.persons[user] !== 'Client' && users.persons[user] !== 'Administrator'){
        jq('#add-app').hide();
    } else {
        jq('#add-app').show();
    }

    jq('#applicationsList').fadeIn('normal');//add-app
}

jq(document).ready(function(){

    if (localStorage.getItem('users') === null){
        localStorage.setItem('users', JSON.stringify({ 'persons' : {'Admin' : 'Administrator'}, 'Contractors': {} }));
    }
    if (localStorage.getItem('apps') === null){
        localStorage.setItem('apps', JSON.stringify({'Admin' : []}));
    }

    if (localStorage.getItem('ActiveUser') !== null){
        jq('.content:visible').children().hide();
        showApplicationList(localStorage.getItem('ActiveUser'));

        var users = JSON.parse(localStorage.getItem('users'));
        if (localStorage.getItem('ActiveUser') === 'Admin' || users.Contractors.hasOwnProperty(localStorage.getItem('ActiveUser'))){
            jq('.edit_status').show();
        } else {
            jq('.edit_status').hide();
        }

        if (localStorage.getItem('ActiveUser') !== 'Admin'){
            jq('.admin-panel').hide();
        } else {
            jq('.admin-panel').show('normal');
        }
    } else {
        jq('#logIn_form').show();
        jq('.admin-panel').hide();
    }

    jq('#enter').click(function(){

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
    });

    jq('#exit').click(function(){
        localStorage.removeItem('ActiveUser');
        jq('#applicationsList').hide();
        jq('#logIn_form').show();
        jq('.apps').html('');
        jq('#empty-list').hide();
        jq('.admin-panel').hide();
        location.reload();
    });

    jq('#sign-in').click(function(){
        jq('#logIn_form').hide();
        jq('#reg_form').show();
    });

    jq('#create_ac').click(function(){

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
    });

    jq('#cancel-reg').click(function(){
        jq('#reg_form').hide();
        jq('#logIn_form').show();
    });

    jq('#add-app').click(function(event){
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
    });

    //Создание заявки
    jq('#create_app').click(function(){
        var apps = JSON.parse(localStorage.getItem('apps'));
        var Appl = CreateApp(localStorage.getItem('ActiveUser'), jq('#contractors').val(), jq('.comment').val(),
            jq('#priority').val(), jq('#estimated').val(), jq('#deadline').val(), 0);

        apps[localStorage.getItem('ActiveUser')][apps[localStorage.getItem('ActiveUser')].length] = Appl;
        apps.Admin[apps.Admin.length] = Appl;

        localStorage.removeItem('apps');
        localStorage.setItem('apps', JSON.stringify(apps));
        jq('#modal_close').click();
        location.reload();
    });

    /* Зaкрытие мoдaльнoгo oкнa, тут делaем тo же сaмoе нo в oбрaтнoм пoрядке */
    jq('#modal_close, #overlay').click( function(){ // лoвим клик пo крестику или пoдлoжке
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
    });

    jq('#add-contr').click(function(event){
        jq('.form-for-add-contr').slideToggle(200);
    });

    //Добавление исполнителя
    jq('#create_contr').click(function(){

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
    });

    jq('#make-contr').click(function(){
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
    });

    jq('#appoint_contr').click(function(){
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
    });

    jq('.app-title').click(function(){
        jq(this).siblings().slideToggle(200);
    });

    jq('.edit_status').click(function(){

        var s = jq(this).parent().text();
        /*var name = s.substring( s.indexOf('Клиент: ') + 8, s.indexOf('Исполнитель:') );
        var info = s.substring( s.indexOf('Информация: ') + 12, s.indexOf('Приоритет:') );
        var app_n = parseInt(s.substring(6));*/

        /*var obj = {
            name: s.substring( s.indexOf('Клиент: ') + 8, s.indexOf('Исполнитель:') ),
            info: s.substring( s.indexOf('Информация: ') + 12, s.indexOf('Приоритет:') ),
            contr: s.substring( s.indexOf('Исполнитель: ') + 13, s.indexOf('Информация:') ),
            app_n: parseInt(s.substring(6))
        };
        localStorage.setItem('temporary', JSON.stringify(obj));*/

        jq('#status_value').val( parseFloat(s.substring(s.indexOf('Готовность: ') + 12, s.indexOf('Редактировать'))) );
        jq('#overlay').fadeIn('normal');
        jq('.edit_panel').show('normal');
    });

    jq('#change_status').click(function(){

        var status = parseFloat(jq('#status_value').val());

        if (status > 100) status = 100;

        if (status > 0){
            /*var obj = JSON.parse(localStorage.getItem('temporary'));
            var apps = JSON.parse(localStorage.getItem('apps'));

            for(var i = 0; i < apps[obj.name].length; i++){
                if (obj.info === apps[obj.name][i].info){
                    apps[obj.name][i].ready = status + '%';
                    apps.Admin[obj.app_n-1].ready = status + '%';
                    if (apps[obj.contr] !== undefined) apps[obj.contr] = status + '%';
                    break;
                }
            }*/
        }

        jq('.edit_panel').hide('normal');
        jq('#status_value').val('');
        jq('#overlay').fadeOut('normal');
        /*localStorage.removeItem('temporary');
        localStorage.removeItem('apps');
        localStorage.setItem('apps', JSON.stringify(apps));
        location.reload();*/
    });

    //jq('.edit_panel').show('normal');     temporary
});
