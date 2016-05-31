;

window.onload = function(){

    if (localStorage.getItem('users') === null){
        localStorage.setItem('users', JSON.stringify({ 'persons' : {'Admin' : 'Administrator'}, 'Contractors': {} }));
    }
    if (localStorage.getItem('apps') === null){
        localStorage.setItem('apps', JSON.stringify({'Admin' : []}));
    }

    if (localStorage.getItem('ActiveUser') !== null){
        //jq('.content:visible').children().hide();
        document.querySelector('#logIn_form').style.display = 'none';
        document.querySelector('#reg_form').style.display = 'none';
        showApplicationList(localStorage.getItem('ActiveUser'));

        var users = JSON.parse(localStorage.getItem('users'));
        if (localStorage.getItem('ActiveUser') === 'Admin' || users.Contractors.hasOwnProperty(localStorage.getItem('ActiveUser'))){
            document.querySelector('.edit_status').style.display = 'block';
        } else {
            document.querySelector('.edit_status').style.display = 'none';
        }

    } else {
        document.querySelector('#logIn_form').style.display = 'block';
    }

    //кнопка "войти"
    document.querySelector('#enter').onclick = EnterSystem;

    //кнопка "зарегистрироваться"
    document.querySelector('#sign-in').onclick = function(){
        document.querySelector('#logIn_form').style.display = 'none';
        document.querySelector('#reg_form').style.display = 'block';
    };

    //кнопка "Создать профиль"
    document.querySelector('#create_ac').onclick = SaveUser;

    //кнопка "Отмена" при регистрации
    document.querySelector('#cancel-reg').onclick = function(){
        document.querySelector('#logIn_form').style.display = 'block';
        document.querySelector('#reg_form').style.display = 'none';
    };
};

