
import $ from 'jquery';
import tmpl from "./../templates/searchForm.ejs";

const searchApps = () => {

  var text = $('#search-text').val();

  if ((/\s+/.test(text)) || (text === '')) {

    alert('Введите текст для поиска');
    $('#search-text').val('');

    return;

  }

  $('.app:not(:contains(' + text + '))').hide();
  $('#cancel-search').removeAttr('disabled');

};

const cancelSearch = () => {

  $('.app:hidden').show();
  $('#cancel-search').attr('disabled', '');
  $('#search-text').val('');

};

const showFormForSearch = () => {

  var search_obj = {
    search_button: "Найти",
    cancel_search: "Отменить"
  };

  var html = tmpl( search_obj );

  $('.form-for-search').html(html);

  //Поиск по заявкам
  $('#search').click(searchApps);

  //Отмена поиска
  $('#cancel-search').click(cancelSearch);

  $('.form-for-search').slideToggle(200);

};

export default {
  showFormForSearch,
  searchApps,
  cancelSearch
};

