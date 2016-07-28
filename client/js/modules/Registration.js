import 'whatwg-fetch';
import $ from 'jquery';
import App from './App.js';
import showAppsList from './ShowApplicationList.js';
import tmpl from "./../templates/registration_form.ejs";

const createUser = () => {

  const username = $('#reg_name').val();

  if ((/\s+/.test(username)) || ( username === '')) {

    alert('Введите, пожалуйста, логин!');
    $('#reg_name').val('');

    return;

  }

  fetch('/api/users', {
    method : "POST",
    headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
    body: 'login=' + username
  }).then((response) => {

    if (response.status >= 200 && response.status < 300) {

      return response;

    }
    const error = new Error(response.statusText);

    error.response = response;
    throw error;

  }).
    then(() => {

    fetch('/api/activeUsers', {
      method: "POST",
      headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
      body: 'login=' + username
    }).then((response) => {

      if (response.status >= 200 && response.status < 300) {

        return response;

      }
      const error = new Error(response.statusText);

      error.response = response;
      throw error;

    }).
    then(() => {

      $('#reg_name').val('');
      $('#reg_form').hide();
      showAppsList.showApplicationList(username);
      $('#add-app').click(App.showFormForAddApp);

    });

  }).catch(() => {

    alert('Данный логин занят!');

  });

};

const showRegistrationForm = () => {

  const reg = {
    title: "Регистрация",
    reg_lab: "Логин",
    reg_button: "Создать профиль",
    cancel_button: "Отмена"
  };

  const html = tmpl( reg );

  $('#reg_form').html(html).show();

  $('#logIn_form').hide();

  $('#cancel-reg').click(() => {

    $('#reg_form').hide();
    $('#logIn_form').show();

  });

  $('#create_ac').click(createUser);

};

export default {
  showRegistrationForm,
  createUser
};
