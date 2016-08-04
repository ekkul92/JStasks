import $ from 'jquery';
import Router from './router';
import _ from 'lodash';
import tmpl_form from "./../templates/authorization_form.ejs";

export default class Auth {
  constructor(element) {
    this.el = element;
    this.username = '';
    this.isContractor = false;
    this.continue = true;
    this.fetch = undefined;
  }

  createEvents() {

    this.el.on('submit', 'form', this, (event) => {
      event.preventDefault();
      this.username = $('input#login_name').val();

      if ((/\s+/.test(this.username)) || (this.username === '')) {

        alert('Введите, пожалуйста, логин!');
        $('#login_name').val('');

      } else {
        this.enterSystem();
      }
    });

    this.el.on('click', '#sign-in', this, () => {

      Router.navigate('reg');

});

  }

  render() {

    fetch("/api/users/Admin", {method:"GET"}).
    then((response) => response.json()).
    then(() => {

      fetch("/api/users", {
        method: "POST",
        headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
        body: 'login=Admin'
      });
    });

    const infoActiveUser = JSON.parse(sessionStorage.getItem('activeUser'));

    if (sessionStorage.getItem('activeUser') !== null){
      Router.navigate('app', {
        username: infoActiveUser.login,
        isContractor:infoActiveUser.isContractor
      });
      this.continue = false;
    }

    if (this.continue) {
      const auth = {
        title: "Авторизация",
        auth_lab: "Логин",
        auth_button: "Войти",
        reg_button: "Регистрация"
      };

      this.el.html(tmpl_form( auth ));
      $('#logIn_form').fadeIn('normal');
    }
  }

  enterSystem() {

    this.fetch = () => {

      fetch('/api/users/' + this.username, {method: "GET"}).
      then((response) => {

        if (response.status >= 200 && response.status < 300) {


          return response;

        }
        const error = new Error(response.statusText);

        error.response = response;
        throw error;

      }).
      then((response) => response.json()).
      then(() => {

        sessionStorage.setItem('activeUser', JSON.stringify({
          'login' : this.username,
          'isContractor' : this.isContractor
        }));

        Router.navigate('app', {
          username: this.username,
          isContractor: this.isContractor
        });

      }).catch(() => {

        fetch('/api/contractors/' + this.username, {method: "GET"}).
        then((response) => {

          if (response.status >= 200 && response.status < 300) {

            return response;

          }
          const error = new Error(response.statusText);

          error.response = response;
          throw error;

        }).
        then((response) => response.json()).
        then(() => {

          $('#empty-list').show();

          this.isContractor = true;

          sessionStorage.setItem('activeUser', JSON.stringify({
            'login' : this.username,
            'isContractor' : this.isContractor
          }));

          Router.navigate('app', {
            username: this.username,
            isContractor: this.isContractor
          });
        }).
        catch(() => {
          alert('Вы не зарегистрированы!');
        });
      });

      $('#login_name').val('');
    };

    this.fetch();

  }

  destroy() {
    this.el.off('submit');
  }
}
