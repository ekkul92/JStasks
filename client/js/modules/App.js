
import $ from 'jquery';
import Router from './router';
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

export default class App {

  closeModal() {

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

    if (sel2) {
      sel2.options.length = 0;
    }
    $('.comment').val('');
    $('#estimated').val('');
    $('#deadline').val('');
    $('.edit_panel').hide('normal');
    $('#status_value').val('');

  }

  createApp() {

    if ($('.comment').val() === "" || $('#estimated').val() === '' || $('#deadline').val() === ""){

      alert('Не все данные заполнены');

      return;

    }

    const username = $(".user-name").text();

    const contractor = $('#contractors').val();

    const Appl = new CrreateApp(username, contractor, $('.comment').val(),
      $('#priority').val(), $('#estimated').val(), $('#deadline').val(), 0);

    const objToStrong = (object) => {

      let s = '';

      for (const key in object) {

        if (object.hasOwnProperty(key)) {

          s += key.toString() + '=' + object[key] + '&';

        }
      }

      return s.substring(0, s.length - 1);
    };

    fetch("/api/users/" + username + "/apps", {
      method: "POST",
      headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
      body:  objToStrong(Appl)
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
          body: objToStrong(Appl)
        }).then(() => {

          $('#modal_close').click();

        });

      }

      if (contractor !== '') {

        Appl.contractorsId = contractor;
        Appl.id = 0;
        Appl.userId = contractor;

        //добавление заявки исполнителю
        fetch("/api/contractors/" + contractor + "/apps", {
          method: "POST",
          headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
          body:  objToStrong(Appl)
        });

      }

      $('#modal_close').click();
      Router.currentView.render();
      Router.currentView.createEvents();

    }).catch(alert);

  }

  showFormForAddApp() {

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

    $('#modal_close, #overlay').click(new App().closeModal);

    $('#create_app').click(new App().createApp);

    event.preventDefault();
    $('#overlay').fadeIn(400,
      () => {
        $('#modal_add_app').css('display', 'block').animate({
          opacity: 1,
          top: '50%'
        }, 200);

        const SEL = document.getElementById('contractors');

        fetch( "/api/contractors", {method:"GET"}).
        then((response) => response.json()).
        then((data) => {

          SEL.options[SEL.options.length] = new Option( '' );

          data.forEach((elem) => {

            SEL.options[SEL.options.length] = new Option( elem.login );

          });

        });
      });

  }
}
