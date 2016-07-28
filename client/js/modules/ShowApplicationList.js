import 'whatwg-fetch';
import $ from 'jquery';
import exit from './exitSystem.js';
import tmpl_content from "./../templates/list_content.ejs";
import tmpl_edit from "./../templates/editPanel.ejs";
import tmpl_list from "./../templates/template1.ejs";
import tmpl_title from "./../templates/list_title.ejs";

//изменить статус заявки
const changeStatus = () => {

  let status = parseFloat($('#status_value').val());

  if (status > 100){

    status = 100;

  }

  $('.edit_panel').hide('normal');
  $('#status_value').val('');
  $('#overlay').fadeOut('normal');

};

//Показать форму для изменения статуса заявки
const showFormForEditStatus = (elem) => {

  const edit_panel = {
    title : "Статус заявки",
    button_change: "Изменить"
  };

  const html = tmpl_edit( edit_panel );

  $('.edit_panel').html(html);

  $('#change_status').click(changeStatus);

  const s = $(elem).parent().text();

  $('#status_value').val(parseFloat(s.substring(s.indexOf('Готовность: ') + 12, s.indexOf('Редактировать'))));
  $('#overlay').fadeIn('normal');
  $('.edit_panel').show('normal');

};

//показать список заявок
const showApplicationList = (user, isContractor) => {

  //----------------------------
  const list_title = {
    button_add_app: "Добавить заявку",
    button_exit: "Выйти"
  };

  let html = tmpl_title(list_title);

  $('.list-title').html(html);

  $('#exit').click(exit.exitSystem);

  const list_content = {empty_list: "Список заявок пуст ..."};

  html = tmpl_content(list_content);

  $('.list-content').html(html);
  //----------------------------

  $('#applicationsList > .list-title > .user-name').text(user);

  fetch("/api/users/" + user + "/apps", {method: "GET"}).
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

      if (data.length === 0) {

        $('#empty-list').show();
        $('.apps').hide();
        $('#applicationsList').fadeIn('normal');

      } else {

        $('#empty-list').hide();

        const obj = {items: data};

        const html = tmpl_list(obj);

        $('.list-content > .apps').html(html);

        $('.apps').show();

        $('#add-app').show();

        $('.app-title').click((event) => {

          $(event.currentTarget).siblings().slideToggle(200);

        });

        $('#applicationsList').fadeIn('normal');

        if (user !== "Admin") {

          $('.edit_status').hide();

        } else {

          $('.edit_status').show();
          $('.edit_status').click((event) => {
            showFormForEditStatus(event.currentTarget);
          });

        }

        if (isContractor) {

          $('#add-app').hide();
          $('.admin-panel').hide();

        }
      }

  }).catch( () => {

    $('#empty-list').show();
    $('.apps').hide();

  });
};

export default {
  showApplicationList,
  showFormForEditStatus,
  changeStatus
};
