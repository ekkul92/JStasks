import $ from 'jquery';
import App from './App.js';
import Router from './router';
import Show from './showAdminPanel.js';
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

  $('#app').append(html);

  $('#change_status').click(changeStatus);

  const s = $(elem).parent().text();

  $('#status_value').val(parseFloat(s.substring(s.indexOf('Готовность: ') + 12, s.indexOf('Редактировать') - 13)));
  $('#overlay').fadeIn('normal');
  $('.edit_panel').show('normal');

};


export default class AppsList {

  constructor(element, obj) {
    this.el = element;
    this.username = obj.username;
    this.isContractor = obj.isContractor;
  }

  createEvents() {

    $('#exit').click(exit.exitSystem);

    $('#add-app').click(new App().showFormForAddApp);

    $('#overlay, .edit_status').click(new App().closeModal);

  }

  render() {

    this.el.html(' <div id="applicationsList"> <div class="list-title"></div><hr>' +
      '<div id="modal_add_app"></div><div class="list-content"></div> </div>');

    const list_title = {
      button_add_app: "Добавить заявку",
      button_exit: "Выйти"
    };

    let html = tmpl_title(list_title);

    $('.list-title').html(html);

    const list_content = {empty_list: "Список заявок пуст ..."};

    html = tmpl_content(list_content);

    $('#applicationsList > .list-title > .user-name').text(this.username);

    $('.list-content').html(html);


    if (this.isContractor) {

      fetch("/api/contractors/" + this.username + "/apps", {method: "GET"}).
      then((response) => response.json()).
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

          $('#button_add_app').hide();

          $('.app-title').click((event) => {
            $(event.currentTarget).siblings().slideToggle(200);
          });

          $('#applicationsList').fadeIn('normal');
        }

        $('.edit_status').hide();
        $('#add-app').hide();

      });

    } else {

      fetch("/api/users/" + this.username + "/apps", {method: "GET"}).
      then((response) => {

        if (response.status >= 200 && response.status < 300) {

          return response;

        }
        const error = new Error(response.statusText);

        error.response = response;
        throw error;

      }).
      then((response) => response.json()).
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

          if (this.username !== "Admin") {

            $('.edit_status').hide();

          } else {

            $('.edit_status').show();
            $('.edit_status').click((event) => {
              showFormForEditStatus(event.currentTarget);
            });

          }
        }
      }).
      catch( () => {

        $('#empty-list').show();
        $('.apps').hide();

      });

    }

    if (this.username !== 'Admin') {
      $('.admin-panel').hide();
    } else {
      new Show().showAdminPanel();
    }
  }

  destroy () {
    this.el.off('submit');
  }
}
