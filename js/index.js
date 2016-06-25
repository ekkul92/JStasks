;
var jq = jQuery.noConflict();

var func_list = require('./func_list');

jq(document).ready(function(){

    if (localStorage.getItem('users') === null){
        localStorage.setItem('users', JSON.stringify({ 'persons' : {'Admin' : 'Administrator'}, 'Contractors': {} }));
    }
    if (localStorage.getItem('apps') === null){
        localStorage.setItem('apps', JSON.stringify({'Admin' : []}));
    }

    if (localStorage.getItem('ActiveUser') !== null){
        jq('.content:visible').children().hide();
        func_list.showApplicationList(localStorage.getItem('ActiveUser'));

        var users = JSON.parse(localStorage.getItem('users'));
        if ( localStorage.getItem('ActiveUser') === 'Admin' || users.Contractors.hasOwnProperty(localStorage.getItem('ActiveUser')) ){
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

    jq('#enter').click(func_list.enterSystem);

    jq('#exit').click(func_list.exitSystem);

    jq('#sign-in').click(function(){
        jq('#logIn_form').hide();
        jq('#reg_form').show();
    });

    jq('#create_ac').click(func_list.createUser);

    jq('#cancel-reg').click(function(){
        jq('#reg_form').hide();
        jq('#logIn_form').show();
    });

    jq('#add-app').click(func_list.showFormForAddApp);

    //Создание заявки
    jq('#create_app').click(func_list.createApp);

    /* Зaкрытие мoдaльнoгo oкнa */
    jq('#modal_close, #overlay').click(func_list.closeModal);

    jq('#add-contr').click(function(event){
        jq('.form-for-add-contr').slideToggle(200);
    });

    jq('#filter-list').click(func_list.filter);

    jq('#search-apps').click(function(event){
        jq('.form-for-search').slideToggle(200);
    });

    //Фильтр
    jq('#filter').click(func_list.showFilter);

    //Отмена фильтра
    jq('#cancel-filter').click(func_list.cancelFilter);

    //Поиск по заявкам
    jq('#search').click(func_list.searchApps);

    //Отмена поиска
    jq('#cancel-search').click(func_list.cancelSearch);

    //Добавление исполнителя
    jq('#create_contr').click(func_list.addContr);

    jq('#make-contr').click(func_list.showFormForAddContr);

    jq('#appoint_contr').click(func_list.appointContr);

    jq('.app-title').click(function(){
        jq(this).siblings().slideToggle(200);
    });

    jq('.edit_status').click(func_list.showFormForEditStatus);

    jq('#change_status').click(func_list.changeStatus);
});

exports.func_list = func_list;