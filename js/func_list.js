;
//Функция-конструктор для объекта заявка
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


//Показать список заявок
function showApplicationList(user){

    document.querySelector('#applicationsList > .list-title > .user-name').innerText = user;

    var apps = JSON.parse(localStorage.getItem('apps'));

    if (apps[user].length === 0) {
        document.querySelector('#empty-list').style.display = 'block';
        document.querySelector('.apps').style.display = 'none';
    } else {
        var code = "";
        var arr = apps[user];
        for (var i = 0; i < arr.length; i++){
            code += "<div class='app'><div class='app-title' onclick=\"showApp("+ i +")\">Заявка" + (i+1) + "</div>" +
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
        document.querySelector('.list-content > .apps').innerHTML = code;

        document.querySelector('.apps').style.display = 'block';
        document.querySelector('.app-info').style.display = 'none';

        /*//при клике на заявку
        document.querySelector('.app-title').onclick = function(){
            //var elem = document.querySelector('.form-for-add-contr');
            //elem.style.display = (elem.style.display === 'none')? 'block' : 'none';
            alert('hoho');
            //alert(document.querySelector(this).nextElementSibling.style.display);
        };*/
    }

    var users = JSON.parse(localStorage.getItem('users'));

    if (users.persons[user] !== 'Client' && users.persons[user] !== 'Administrator'){

        document.querySelector('#add-app').style.display = 'none';
    } else {
        document.querySelector('#add-app').style.display = 'inline-block';
    }

    document.querySelector('#applicationsList').style.display = 'block';

    //Если ползователь Админ, то показываем "панель Админа"
    if (user !== 'Admin'){
        document.querySelector('.admin-panel').style.display = 'none';
    } else {
        document.querySelector('.admin-panel').style.display = 'block';
        document.querySelector('.form-for-add-contr').style.display = 'none';
        document.querySelector('.form-for-make-contr').style.display = 'none';
    }

    //кнопка "выйти"
    document.querySelector('#exit').onclick = ExitSystem;

    //кнопка "Добавить заявку"
    document.querySelector('#add-app').onclick = ShowModalAddApp;

    //кнопка "Создать заявку"
    document.querySelector('#create_app').onclick = Create_App;

    //кнопка "X"
    document.querySelector('#modal_close').onclick = CloseModalAddApp;
    document.querySelector('#overlay').onclick = CloseModalAddApp;

    //кнопка "Добавить исполнителя"
    document.querySelector('#add-contr').onclick = function(){
        var elem = document.querySelector('.form-for-add-contr');
        elem.style.display = (elem.style.display === 'none')? 'block' : 'none';
    };

    //"Добавление исполнителя"
    document.querySelector('#create_contr').onclick = AddContr;

    //"Форма для добавления исполнителя"
    document.querySelector('#make-contr').onclick = ShowFormForAppoint;

    //Назначить исполнителя
    document.querySelector('#appoint_contr').onclick = AppointContr;
}


//Показать подробно заявку
function showApp(ind){
    var elem = document.querySelectorAll('.app-info')[ind];
    elem.style.display = (elem.style.display === 'none' || elem.style.display === '')? 'block' : 'none';
}


//Вход в систему
function EnterSystem(){
    if ((/\s+/.test(document.querySelector('#login_name').value)) || (document.querySelector('#login_name').value === '')) {
        alert('Введите, пожалуйста, логин!');
        document.querySelector('#login_name').value = '';
        return;
    }
    var users = JSON.parse(localStorage.getItem('users'));
    var user_name = document.querySelector('#login_name').value;

    if ( users.persons.hasOwnProperty( user_name ) || users.Contractors.hasOwnProperty( user_name ) ){

        document.querySelector('#logIn_form').style.display = 'none';
        localStorage.setItem('ActiveUser', user_name);
        showApplicationList(localStorage.getItem('ActiveUser'));

        document.querySelector('#login_name').value = '';

        if (document.querySelector('#login_name').value !== 'Admin'){
            document.querySelector('.admin-panel').style.display = 'none';
        } else {
            document.querySelector('.admin-panel').style.display = 'block';
        }
        location.reload();

    } else {
        alert('Вы не зарегистрированы!');
    }
}


//Выход из системы
function ExitSystem(){
    localStorage.removeItem('ActiveUser');
    document.querySelector('#applicationsList').style.display = 'none';
    document.querySelector('#logIn_form').style.display = 'block';
    document.querySelector('.apps').innerHTML = '';
    document.querySelector('#empty-list').style.display = 'none';
    document.querySelector('.admin-panel').style.display = 'none';
    location.reload();
}


//Сохранение пользователя при регистрации
function SaveUser(){

    var user_name = document.querySelector('#reg_name').value;

    if ((/\s+/.test(user_name)) || (user_name === '')) {
        alert('Введите, пожалуйста, логин!');
        jq('#reg_name').val('');
        return;
    }
    var users = JSON.parse(localStorage.getItem('users'));

    if (users.persons.hasOwnProperty( user_name )){
        alert('Данный пользовать уже существует!');
        document.querySelector('#reg_name').value = '';
        return;
    } else {
        users.persons[user_name] = 'Client';
        localStorage.removeItem('users');
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('ActiveUser', user_name);

        var apps = JSON.parse(localStorage.getItem('apps'));
        apps[user_name] = [];
        localStorage.removeItem('apps');
        localStorage.setItem('apps', JSON.stringify(apps));

        document.querySelector('#reg_name').value = '';
        document.querySelector('#reg_form').style.display = 'none';
        showApplicationList(localStorage.getItem('ActiveUser'));
    }
}


//показать модальное окно для создания заявки
function ShowModalAddApp(){
    document.querySelector('#overlay').style.display = 'block';
    document.querySelector('#modal_add_app').style.display = 'block';
    document.querySelector('#modal_add_app').style.opacity = '1';

    var sel = document.getElementById('contractors');
    var users = JSON.parse(localStorage.getItem('users'));
    for(var key in users.Contractors){
        sel.options[sel.options.length] = new Option(key);
    }
}


//Создание заявки
function Create_App(){
    var apps = JSON.parse(localStorage.getItem('apps'));
    var Appl = CreateApp(localStorage.getItem('ActiveUser'),
                        document.querySelector('#contractors').value,
                        document.querySelector('.comment').value,
                        document.querySelector('#priority').value,
                        document.querySelector('#estimated').value,
                        document.querySelector('#deadline').value, 0);

    apps[localStorage.getItem('ActiveUser')][apps[localStorage.getItem('ActiveUser')].length] = Appl;
    apps.Admin[apps.Admin.length] = Appl;

    localStorage.removeItem('apps');
    localStorage.setItem('apps', JSON.stringify(apps));
    //jq('#modal_close').click();
    location.reload();
}


//Закрытие модального окна
function CloseModalAddApp(){
    document.querySelector('#overlay').style.display = 'none';
    document.querySelector('#modal_add_app').style.display = 'none';
    document.querySelector('.edit_panel').style.display = 'none';

    var sel2 = document.getElementById('contractors');
    sel2.options.length = 0;
    document.querySelector('.comment').value = '';
    document.querySelector('#estimated').value = '';
    document.querySelector('#deadline').value = '';
    document.querySelector('#status_value').value = '';
}


//Добавление исполнителя
function AddContr(){
    var user_name = document.querySelector('#contr-name').value;

    if ((/\s+/.test(user_name)) || (user_name === '')) {
        alert('Введите, пожалуйста, логин!');
        document.querySelector('#contr-name').value = '';
        return;
    }

    var users = JSON.parse(localStorage.getItem('users'));
    if (users['Contractors'] === undefined){
        users['Contractors'] = {};
    }

    if (users.Contractors.hasOwnProperty(user_name)){
        alert('Данный исполнитель уже существует!');
        return;
    }

    users.Contractors[user_name] = 0;
    localStorage.removeItem('users');
    localStorage.setItem('users', JSON.stringify(users));

    var apps = JSON.parse(localStorage.getItem('apps'));
    apps[user_name] = [];
    localStorage.removeItem('apps');
    localStorage.setItem('apps', JSON.stringify(apps));

    alert('Исполнитель успешно добавлен!');
    document.querySelector('.form-for-add-contr').style.display = 'none';
    document.querySelector('#contr-name').value = '';
    location.reload();
}


//Показать форму для назачения исполнителей
function ShowFormForAppoint(){
    var sel = document.getElementById('contr-list');
    sel.options.length = 0;
    var users = JSON.parse(localStorage.getItem('users'));
    for(var key in users.Contractors){
        sel.options[sel.options.length] = new Option(key);
    }

    sel = document.getElementById('apps-list');
    sel.options.length = 0;

    for (var i = 1; i <= document.querySelector('.apps').childNodes.length; i++){
        sel.options[sel.options.length] = new Option('Заявка' + i);
    }

    var elem = document.querySelector('.form-for-make-contr');
    elem.style.display = (elem.style.display === 'none' || elem.style.display === '')? 'block' : 'none';
}


//Назначение исполнителя
function AppointContr(){
    var user = document.querySelector('#contr-list').value;
    var sel = document.querySelector('#apps-list');
    var app = sel.value;

    //alert(sel.selectedIndex);

    if(user === ''){
        alert('Нет исполнителей для назначения!');
        return;
    }
    if(app === ''){
        alert('Нет заявок для назначения!');
        return;
    }

    var s = document.querySelector('.apps').childNodes[sel.selectedIndex].querySelector('.app-info').innerText;
    var name = s.substring( s.indexOf('Клиент: ') + 8, s.indexOf('Исполнитель:')-1 );
    var info = s.substring( s.indexOf('Информация: ') + 12, s.indexOf('Приоритет:')-1 );
    var app_n = app.substring(6);

    var apps = JSON.parse(localStorage.getItem('apps'));

    for(var i = 0; i < apps[name].length; i++){
        if (info === apps[name][i].info){
            apps[name][i].contractor = user;
            apps.Admin[app_n-1].contractor = user;
            apps[user][apps[user].length] = new Object(apps[name][i]);
            break;
        }
    }

    localStorage.removeItem('apps');
    localStorage.setItem('apps', JSON.stringify(apps));
    location.reload();
}