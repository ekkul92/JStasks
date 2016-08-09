
import $ from 'jquery';
import tmpl_form from "./../templates/filter_form.ejs";

export default class Filter {
  showFilter() {

    const user = $('#clients-list').val();

    $('.app:not(:contains(Клиент: ' + user + '))').hide();
    $('#cancel-filter').removeAttr('disabled');

  }

  cancelFilter() {

    $('.app:hidden').show();
    $('#cancel-filter').attr('disabled', '');

  }

  filter() {

    const filter = {
      filter: "Показать",
      cancel_filter: "Отменить"
    };
    const html = tmpl_form(filter);

    $('.form-for-filter').html(html);

    //Фильтр
    $('#filter').click(new Filter().showFilter);

    //Отмена фильтра
    $('#cancel-filter').click(new Filter().cancelFilter);

    const sel = document.getElementById('clients-list');

    sel.options.length = 0;

    fetch("/api/users", {method: "GET"}).then((response) => response.json()).then((data) => {

      data.forEach((elem) => {

        sel.options[sel.options.length] = new Option(elem.login);

      });
      $('.form-for-filter').slideToggle(200);

    });
  }
}
