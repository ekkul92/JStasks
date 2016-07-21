var $ = require('jquery');

module.exports = {
  showFormForSearch: function(){
    var search_obj = {
      search_button: "Найти",
      cancel_search: "Отменить"
    };

    var tmpl = require("./../templates/searchForm.ejs");

    var html = tmpl( search_obj );

    $('.form-for-search').html(html);

    //Поиск по заявкам
    $('#search').click(module.exports.searchApps);

    //Отмена поиска
    $('#cancel-search').click(module.exports.cancelSearch);

    $('.form-for-search').slideToggle(200);
  },

  searchApps: function (){
    var text = $('#search-text').val();

    if ((/\s+/.test(text)) || (text === '')) {
      alert('Введите текст для поиска');
      $('#search-text').val('');
      return;
    } else {
      $('.app:not(:contains(' + text + '))').hide();
      $('#cancel-search').removeAttr('disabled');
    }
  },

  cancelSearch: function (){
    $('.app:hidden').show();
    $('#cancel-search').attr('disabled','');
    $('#search-text').val('');
  }
};
