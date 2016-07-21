var $ = require('jquery');

module.exports = {
  filter: function() {

    var filter ={
      filter : "Показать",
      cancel_filter: "Отменить"
    };

    var tmpl = require("./../templates/filter_form.ejs");

    var html = tmpl( filter );

    $('.form-for-filter').html(html);

    //Фильтр
    $('#filter').click(module.exports.showFilter);

    //Отмена фильтра
    $('#cancel-filter').click(module.exports.cancelFilter);

    var sel = document.getElementById('clients-list');
    sel.options.length = 0;

    $.ajax({
      type: "GET",
      url: "/api/users"
    }).done(function( data){
      data.forEach( function (elem){
        sel.options[sel.options.length] = new Option(elem.login);
      });
      $('.form-for-filter').slideToggle(200);
    })
  },

  showFilter: function() {
    var user = $('#clients-list').val();
    $('.app:not(:contains(Клиент: ' + user + '))').hide();
    $('#cancel-filter').removeAttr('disabled');
  },

  cancelFilter: function() {
    $('.app:hidden').show();
    $('#cancel-filter').attr('disabled','');
  }
};
