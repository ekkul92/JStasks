
require('./../css/index.css');

import $ from 'jquery';
import App from './modules/App.js';
import aut from './modules/Authorization.js';
import reg from './modules/Registration.js';
import showAL from './modules/ShowApplicationList.js';
import showAP from './modules/showAdminPanel.js';

  aut.showAuthForm();

  fetch("/api/users/Admin", {method:"GET"}).
    then((response) => {
     return response.json();
    }).
    then(() => {

    fetch("/api/users", {
      method: "POST",
      headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
      body: 'login=Admin'
    });
  });

  fetch("/api/activeUsers", {method: "GET"}).
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
    then((data) => {

    if (data[0] !== undefined){

      $('.content:visible').children().hide();
      showAL.showApplicationList(data[0].login);
      $('#add-app').click(App.showFormForAddApp);

      if ( data[0].login === 'Admin' ){

        $('.edit_status').show();
        $('.edit_status').click(showAL.showFormForEditStatus);
        showAP.showAdminPanel();

      } else {

        $('.edit_status').hide();
        $('.admin-panel').hide();

      }
    } else {

      $('#logIn_form').show();
      $('.admin-panel').hide();

    }

  }).catch(() => {

    $('#logIn_form').show();
    $('.admin-panel').hide();

  });

  $('#enter').click(aut.enterSystem);

  $('#sign-in').click(reg.showRegistrationForm);

  $('#overlay, .edit_status').click(App.closeModal);


