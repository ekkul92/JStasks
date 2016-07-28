import 'whatwg-fetch';
import $ from 'jquery';
import App from './App.js';
import Filter from './Filter.js';
import Search from './Search.js';
import showAL from './ShowApplicationList.js';
import tmpl_contr from "./../templates/add_contactor.ejs";
import tmpl_make from "./../templates/make_contractor.ejs";
import tmpl_panel from "./../templates/adminPanel.ejs";


//назначение исполнителя
const appointContr = () => {

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

  const generalObject = (object) => {

    return 'contractor=' + object.contractor +
      '&priority=' + object.priority +
      '&deadline=' + object.deadline +
      '&ready=' + object.ready +
      '&estimated=' + object.estimated +
      '&info=' + object.info +
      '&client=' + object.client +
      '&id=' + object.id +
      '&userId=' + object.userId;

  };

  fetch('/api/users/' + name + '/apps?filter[where][info]=' + info, {method: "GET"}).
    then((response) => {

    return response.json();

  }).
    then((data) => {

        const userObj = new Object(data[0]);

        userObj.contractor = contractor;

       fetch('/api/apps', {
         method: "PUT",
         headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
          body: generalObject( userObj)
       }).then((response) => {

           if (response.status >= 200 && response.status < 300) {

             return response;

           }
           const error = new Error(response.statusText);

           error.response = response;
           throw error;

       }).
       then(() => {

         showAL.showApplicationList($('.user-name').text());
         $('#add-app').click(App.showFormForAddApp);

       });

    });

  if (name !== 'Admin') {

    fetch('/api/users/Admin/apps?filter[where][info]=' + info, {method: 'GET'}).
      then((response) => {
          return response.json();
      }).
      then((data) => {

        const adminObj = new Object(data[0]);

        adminObj.contractor = contractor;

        fetch('/api/apps', {
          method: "PUT",
          headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
           body: generalObject(adminObj)
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

          showAL.showApplicationList($('.user-name').text());
          $('#add-app').click(App.showFormForAddApp);

        });

      });

  }

};

//Добавление исполнителя
const addContr = () => {

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

     alert('Исполнитель успешно добавлен!');
     $('.form-for-add-contr').slideToggle(200);
     $('#contr-name').val('');

   }).catch(() => {

      alert('Данный исполнитель уже зарегистрирован');

   });

};

const showFormForContr = () => {

  const add_contr = {add_button : "Добавить"};

  const html = tmpl_contr( add_contr );

  $('.form-for-add-contr').html(html);

  $('.form-for-add-contr').slideToggle(200);

  $('#create_contr').click(addContr);

};

//Показать форму назначения исполнителя
const showFormForAddContr = () => {

  const make_contr = {make_button : "Добавить"};

  const html = tmpl_make( make_contr );

  $('.form-for-make-contr').html(html);

  $('#appoint_contr').click(appointContr);

  let sel = document.getElementById('contr-list');

  sel.options.length = 0;


  fetch( '/api/contractors', {method: 'GET'} ).
    then((response) => {
      return response.json();
   }).
   then((data) => {
     data.forEach((elem) => {

      sel.options[sel.options.length] = new Option(elem.login);

     });

     sel = document.getElementById('apps-list');
     sel.options.length = 0;

     for (let i = 1; i <= $('.apps').children().length; i++){

      sel.options[sel.options.length] = new Option('Заявка' + i);

     }
     $('.form-for-make-contr').slideToggle(200);

   }).catch(alert);

};

//Панель Админа
const showAdminPanel = () => {

  const adminPanel = {
    title: "Панель администратора",
    button_add_contractor: "Добавить исполнителя",
    button_make_contractor: "Назначить исполнителя",
    button_filter: "Фильтр",
    button_search: "Поиск"
  };

  const html = tmpl_panel( adminPanel );

  $('.admin-panel').html(html);

  $('.admin-panel').show('normal');

  $('#add-contr').click(showFormForContr);

  $('#make-contr').click(showFormForAddContr);

  $('#filter-list').click(Filter.filter);

  $('#search-apps').click(Search.showFormForSearch);

};

export default {
  showAdminPanel,
  showFormForContr,
  showFormForAddContr,
  appointContr,
  addContr
};
