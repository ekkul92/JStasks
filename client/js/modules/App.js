var $ = require('jquery');

var showFL = require('./ShowApplicationList.js');

module.exports = {
  showFormForAddApp: function(){
    var add_app = {
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

    var tmpl = require("./../templates/modal_create_app.ejs");

    var html = tmpl( add_app );

    $('#applicationsList > #modal_add_app').html(html);

    $('#modal_close, #overlay').click(module.exports.closeModal);

    $('#create_app').click(module.exports.createApp);

    event.preventDefault();
    $('#overlay').fadeIn(400,
      function(){
        $('#modal_add_app')
          .css('display', 'block')
          .animate({opacity: 1, top: '50%'}, 200);

        var sel = document.getElementById('contractors');

        $.ajax({
          type: "GET",
          url: "/api/contractors"
        }).done(function(data){
          data.forEach(function(elem){
            sel.options[sel.options.length] = new Option ( elem.login );
          });
        })
      });
  },

  createApp: function(){

    if ($('.comment').val() === "" || $('#estimated').val() === '' || $('#deadline').val() === ""){
      alert ('Не все данные заполнены');
      return;
    }

    var username = $(".user-name").text();

    var Appl = CreateApp(username, $('#contractors').val(), $('.comment').val(),
      $('#priority').val(), $('#estimated').val(), $('#deadline').val(), 0);

    $.ajax({
      type: "POST",
      url: "/api/users/" + username + "/apps",
      data: ( Appl )
    }).done(function(){
      if (username !== 'Admin'){
        $.ajax({
          type: "POST",
          url: "/api/users/Admin/apps",
          data: ( Appl )
        }).done(function(){
          $('#modal_close').click();
        });
      }
      $('#modal_close').click();
      showFL.showApplicationList(username);
    });
  },

  closeModal: function () {
    $('#modal_add_app')
      .animate({opacity: 0, top: '45%'}, 200,
        function(){
          $(this).css('display', 'none');
          $('#overlay').fadeOut(200);
        }
      );
    var sel2 = document.getElementById('contractors');
    sel2.options.length = 0;
    $('.comment').val('');
    $('#estimated').val('');
    $('#deadline').val('');
    $('.edit_panel').hide('normal');
    $('#status_value').val('');
  }
};


//Конструктор объекта заявки
function CreateApp(client, contractor, info, priority, estimated, deadline, ready){
  if(! (this instanceof CreateApp)) {return new CreateApp(client, contractor, info, priority, estimated, deadline, ready);}
  this.client = client;
  this.contractor = contractor;
  this.info = info;
  this.priority = priority;
  this.estimated = estimated;
  this.deadline = deadline;
  this.ready = ready + '%';
}
