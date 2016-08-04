
import $ from 'jquery';
import tmpl from "./../templates/searchForm.ejs";

export default class Search {
  searchApps() {

    var text = $('#search-text').val();

    if ((/\s+/.test(text)) || (text === '')) {

      alert('Введите текст для поиска');
      $('#search-text').val('');

      return;

    }

    $('.app:not(:contains(' + text + '))').hide();
    $('#cancel-search').removeAttr('disabled');

  }

  cancelSearch() {

    $('.app:hidden').show();
    $('#cancel-search').attr('disabled', '');
    $('#search-text').val('');

  }

  showFormForSearch() {

    var search_obj = {
      search_button: "Найти",
      cancel_search: "Отменить"
    };

    var html = tmpl( search_obj );

    $('.form-for-search').html(html);

    //Поиск по заявкам
    $('#search').click(new Search().searchApps);

    //Отмена поиска
    $('#cancel-search').click(new Search().cancelSearch);

    $('.form-for-search').slideToggle(200);

  }
}
