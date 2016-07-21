
require('./../css/index.css');
var $ = require('jquery');

var showFL = require('./modules/ShowApplicationList.js');
var func_list = require('./func_list');

  func_list.showAuthForm();

  $.ajax({
    type: "GET",
    url: "/api/users/Admin"
  }).fail(function(data) {
    $.ajax({
      type: "POST",
      url: "/api/users",
      data: ({login : "Admin"})
    }).done(function(data) {
    }).fail(function(data) {
      console.log("Oops, error: " + data);
    });
  });

  $.ajax( {
    type: "GET",
    url: "/api/activeUsers"
  } ).done(function(data){

    if (data[0] !== undefined){
      $('.content:visible').children().hide();
      showFL.showApplicationList(data[0].login);
      $('#add-app').click(func_list.showFormForAddApp);

      if ( data[0].login === 'Admin' ){
        $('.edit_status').show();
        $('.edit_status').click(showFL.showFormForEditStatus);
        func_list.showAdminPanel();
      } else {
        $('.edit_status').hide();
        $('.admin-panel').hide();
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

  $('#sign-in').click(func_list.showRegistrationForm);

  $('#overlay, .edit_status').click(func_list.closeModal);

exports.func_list = func_list;
