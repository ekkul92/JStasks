import $ from 'jquery';
import App from './App.js';
import Filter from './Filter.js';
import Router from './router';
import Search from './Search.js';
import tmpl_contr from "./../templates/add_contactor.ejs";
import tmpl_make from "./../templates/make_contractor.ejs";
import tmpl_panel from "./../templates/adminPanel.ejs";


export default class Show {
  //Панель Админа
  showAdminPanel() {

    const adminPanel = {
      title: "Панель администратора",
      button_add_contractor: "Добавить исполнителя",
      button_make_contractor: "Назначить исполнителя",
      button_filter: "Фильтр",
      button_search: "Поиск"
    };

    const html = tmpl_panel(adminPanel);

    $('#app').append(html);

    $('.admin-panel').show('normal');

    $('#add-contr').click(new Show().showFormForContr);

    $('#make-contr').click(new Show().showFormForAddContr);

    $('#filter-list').click(new Filter().filter);

    $('#search-apps').click(new Search().showFormForSearch);

  }

//Показать форму назначения исполнителя
  showFormForAddContr() {

    const make_contr = {make_button: "Добавить"};

    const html = tmpl_make(make_contr);

    $('.form-for-make-contr').html(html);

    $('#appoint_contr').click(new Show().appointContr);

    let sel = document.getElementById('contr-list');

    sel.options.length = 0;


    fetch('/api/contractors', {method: 'GET'}).then((response) => response.json()).then((data) => {
      data.forEach((elem) => {

        sel.options[sel.options.length] = new Option(elem.login);

      });

      sel = document.getElementById('apps-list');
      sel.options.length = 0;

      for (let i = 1; i <= $('.apps').children().length; i++) {

        sel.options[sel.options.length] = new Option('Заявка' + i);

      }
      $('.form-for-make-contr').slideToggle(200);

    }).catch(alert);

  }

  showFormForContr() {

    const add_contr = {add_button: "Добавить"};

    const html = tmpl_contr(add_contr);

    $('.form-for-add-contr').html(html);

    $('.form-for-add-contr').slideToggle(200);

    $('#create_contr').click(new Show().addContr);

  }

  //Добавление исполнителя
  addContr() {

    if ((/\s+/.test($('#contr-name').val())) || ($('#contr-name').val() === '')) {

      alert('Введите, пожалуйста, логин!');
      $('#contr-name').val('');

      return;

    }

    const contractor = $('#contr-name').val();

    fetch('/api/contractors', {
      method: 'POST',
      headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
      body: 'login=' + contractor
    }).then((response) => {

      if (response.status >= 200 && response.status < 300) {

        return response;

      }
      const error = new Error(response.statusText);

      error.response = response;
      throw error;

    }).then(() => {

      alert('Исполнитель успешно добавлен!');
      $('.form-for-add-contr').slideToggle(200);

    }).catch(() => {

      alert('Данный исполнитель уже зарегистрирован');
    });
  }
  //назначение исполнителя
  appointContr() {

    if ($('#contr-list').val() === null) {

      alert('Нет исполнителей для назначения!');

      return;

    }

    if ($('#apps-list').val() === null) {

      alert('Нет заявок для назначения!');

      return;

    }

    const s = $('.app:contains(' + $('#apps-list').val() + ')').text();

    const name = s.substring(s.indexOf('Клиент: ') + 8, s.indexOf('Исполнитель:') - 13);

    const info = s.substring(s.indexOf('Информация: ') + 12, s.indexOf('Приоритет:') - 13);

    const contractor = $('#contr-list').val();

    const objToStrong = (object) => {

      let s = '';

      for (const key in object) {

        if (object.hasOwnProperty(key)) {

          s += key.toString() + '=' + object[key] + '&';

        }
      }

      return s.substring(0, s.length - 1);
    };

    fetch('/api/users/' + name + '/apps?filter[where][info]=' + info, {method: "GET"}).
      then((response) => response.json()).
      then((data) => {

        const userObj = new Object(data[0]);

        userObj.contractor = contractor;

        fetch('/api/apps', {
          method: "PUT",
          headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
          body: objToStrong( userObj)
        }).
          then(() => {

            userObj.contractorsId = contractor;
            userObj.id = 0;
            userObj.userId = contractor;

            //добавление заявки исполнителю
            fetch("/api/contractors/" + contractor + "/apps", {
              method: "POST",
              headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
              body:  objToStrong(userObj)
            });

          }).
          then(() => {

            Router.currentView.render();
            Router.currentView.createEvents();
            //new ShowAppList().showApplicationList($('.user-name').text());
            //$('#add-app').click(new App().showFormForAddApp);

          });

      });

    if (name !== 'Admin') {

      fetch('/api/users/Admin/apps?filter[where][info]=' + info, {method: 'GET'}).
      then((response) => response.json()).
      then((data) => {

        const adminObj = new Object(data[0]);

        adminObj.contractor = contractor;

        fetch('/api/apps', {
          method: "PUT",
          headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
          body: objToStrong(adminObj)
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

          Router.currentView.render();
          Router.currentView.createEvents();
          //new ShowAppList().showApplicationList($('.user-name').text());
          //$('#add-app').click(new App().showFormForAddApp);

        });

      });
    }
  }
}
