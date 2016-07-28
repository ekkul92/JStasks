
import $ from 'jquery';
import showFL from './ShowApplicationList.js';
import tmpl from "./../templates/modal_create_app.ejs";

//Конструктор объекта заявки
class CrreateApp{

  constructor(client, contractor, info, priority, estimated, deadline, ready){

    this.client = client;
    this.contractor = contractor;
    this.info = info;
    this.priority = priority;
    this.estimated = estimated;
    this.deadline = deadline;
    this.ready = ready + '%';

  }

}

const closeModal = () => {

  $('#modal_add_app').animate({
      opacity: 0,
      top: '45%'
    }, 200,
    () => {

      $('#modal_add_app').css('display', 'none');
      $('#overlay').fadeOut(200);

    }
  );

  const sel2 = document.getElementById('contractors');

  sel2.options.length = 0;
  $('.comment').val('');
  $('#estimated').val('');
  $('#deadline').val('');
  $('.edit_panel').hide('normal');
  $('#status_value').val('');

};

const createApp = () => {

  if ($('.comment').val() === "" || $('#estimated').val() === '' || $('#deadline').val() === ""){

    alert('Не все данные заполнены');

    return;

  }

  const username = $(".user-name").text();

  const Appl = new CrreateApp(username, $('#contractors').val(), $('.comment').val(),
    $('#priority').val(), $('#estimated').val(), $('#deadline').val(), 0);

  const generalObject = (object) => {

    return 'contractor=' + object.contractor +
      '&priority=' + object.priority +
      '&deadline=' + object.deadline +
      '&ready=' + object.ready +
      '&estimated=' + object.estimated +
      '&info=' + object.info +
      '&client=' + object.client;
  };

  /*$.ajax({
    type: "POST",
    url: "/api/users/" + username + "/apps",
    data: ( Appl )
  }).done(() => {

    if (username !== 'Admin'){

      $.ajax({
        type: "POST",
        url: "/api/users/Admin/apps",
        data: ( Appl )
      }).done(() => {

        $('#modal_close').click();

      });

    }
    $('#modal_close').click();
    showFL.showApplicationList(username);

  });*/
  fetch("/api/users/" + username + "/apps", {
    method: "POST",
    headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
    body:  generalObject(Appl)
  }).then((response) => {

    if (response.status >= 200 && response.status < 300) {

      return response;

    }
    const error = new Error(response.statusText);

    error.response = response;
    throw error;

  }).then(() => {

    if (username !== 'Admin'){

      fetch("/api/users/Admin/apps", {
        method: "POST",
        headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
        body: generalObject(Appl)
      }).then(() => {

        $('#modal_close').click();

      });

    }
    $('#modal_close').click();
    showFL.showApplicationList(username);
    $('#add-app').click(showFormForAddApp);

  }).catch(alert);


};

const showFormForAddApp = () => {

  const add_app = {
    title: "Добавить заявку",
    contractor: "Исполнитель: ",
    info: "Описание: ",
    priority: "Приоритет: ",
    item1: "Низкий",
    item2: "Средний",
    item3: "Высокий",
    estimated: "Ожидаемое время выполнения (в днях)",
    deadline: "Крайний срок (в днях)",
    button_add: "Добавить"
  };

  const html = tmpl( add_app );

  $('#applicationsList > #modal_add_app').html(html);

  $('#modal_close, #overlay').click(closeModal);

  $('#create_app').click(createApp);

  event.preventDefault();
  $('#overlay').fadeIn(400,
    () => {
      $('#modal_add_app').css('display', 'block').animate({
        opacity: 1,
        top: '50%'
      }, 200);

      const SEL = document.getElementById('contractors');

      /*$.ajax({
        type: "GET",
        url: "/api/contractors"
      }).done((data) => {

        data.forEach((elem) => {

          SEL.options[SEL.options.length] = new Option( elem.login );

        });

      });
    });
    */
      fetch( "/api/contractors", {method:"GET"}).
        then((response) => {

           return response.json();

        }).
        then((data) => {

        data.forEach((elem) => {

          SEL.options[SEL.options.length] = new Option( elem.login );

        });

      });
    });


};


export default {
  showFormForAddApp,
  createApp,
  closeModal
};

