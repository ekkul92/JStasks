import 'whatwg-fetch';
import $ from 'jquery';
import App from './App.js';
import showAP from './showAdminPanel.js';
import showAppsList from './ShowApplicationList.js';
import tmpl_form from "./../templates/authorization_form.ejs";

const showAuthForm = () => {

  const auth = {
    title: "Авторизация",
    auth_lab: "Логин",
    auth_button: "Войти",
    reg_button: "Регистрация"
  };

  const html = tmpl_form( auth );

  $('#logIn_form').html(html);

};

const enterSystem = () => {

  const username = $('#login_name').val();

  if ((/\s+/.test(username)) || (username === '')) {

    alert('Введите, пожалуйста, логин!');
    $('#login_name').val('');

    return;

  }

  fetch('/api/users/' + username, {method: "GET"}).
      then((response) => {

          if (response.status >= 200 && response.status < 300) {

            return response;

          }
          const error = new Error(response.statusText);

          error.response = response;
          throw error;

      }).
       then((response) => {
          return response.json();
       }).
       then(() => {

           $('#logIn_form').hide();

           fetch('/api/activeUsers', {
           method: "POST",
           headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
           body: 'login=' + username
           }).
       then((response) => {

           if (response.status >= 200 && response.status < 300) {

           return response;

           }
           const error = new Error(response.statusText);

           error.response = response;
           throw error;

       }).
       then(() => {

           if (username !== 'Admin') {

           $('.admin-panel').hide();

           } else {

           showAP.showAdminPanel();

           }
           showAppsList.showApplicationList(username);
           $('#add-app').click(App.showFormForAddApp);

       }).catch(() => {

           alert('Error!');

       });

       }).catch(() => {

           alert('Вы не зарегистрированы!');

       });


};

export default {
  showAuthForm,
  enterSystem
};
