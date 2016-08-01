import $ from 'jquery';
import Router from './router';
import tmpl from "./../templates/registration_form.ejs";

export default class Reg {

  constructor(element){
    this.el = element;
    this.fetch = undefined;
  }

  createEvents() {

    this.el.on('click', '#cancel-reg', (event) => {
      Router.navigate('auth');
    });

    this.el.on('submit', 'form', (event) => {
      event.preventDefault();
      this.createUser();
    });

  }

  render() {
    const reg = {
      title: "Регистрация",
      reg_lab: "Логин",
      reg_button: "Создать профиль",
      cancel_button: "Отмена"
    };

    this.el.html(tmpl(reg));
    $('#reg_form').fadeIn('normal');
  }

  createUser() {

    this.fetch = () => {
      const username = $('#reg_name').val();

      if ((/\s+/.test(username)) || ( username === '')) {

        alert('Введите, пожалуйста, логин!');
        $('#reg_name').val('');

        return;

      }

      fetch('/api/users', {
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

      }).then(() => {

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

        }).then(() => {

          $('#reg_name').val('');
          Router.navigate('app', {
            username: username,
            isContractor: false
          });
          //$('#add-app').click(new App().showFormForAddApp);

        });

      }).catch(() => {

        alert('Данный логин занят!');

      });
    };

    this.fetch();

  }

  destroy() {
    this.el.off('submit');
  }

}
