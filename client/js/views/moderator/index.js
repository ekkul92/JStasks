import {View} from 'backbone';
import tmpl from './moderatorButtons.ejs';
import tmpl_modal from './moderator_window.ejs';
import $ from 'jquery';


export default View.extend({

  events: {

  },

  initialize: function() {
    let html = tmpl();
    $('.for_moderator').html(html);

    $('#enter_moderator').click(() => {
      let html = tmpl_modal();
      $('.window_moderator').html(html).fadeIn('normal');

      $("#overlay").show().click(() => {
        $(".window_moderator").hide();
        $("#overlay").hide();
      });
      $('.enter').click(this.enter);

    });


    /*  if (sessionStorage.getItem('moderator')){
     $('#exit_moderator').show();
     $('#enter_moderator').hide();
     $('.delete_theme').show();
     //.click((e) => {
     /// new Moderator().delete_theme(e);               ???????????
     //});
     $('.delete_section').show();

     } else{
     $('#exit_moderator').hide();
     $('#enter_moderator').show();
     }
     */

  },

  enter: function() {
    let password = $('.password').val();
    password = $.trim(password);

    if (password === '1') {
      sessionStorage.setItem('moderator', '1');
      $('.delete').show();
      $('.delete_theme').show();
      //this.delete_theme(e);
      $('.delete_section').show();


      $('#overlay').hide();
      $('.window_moderator').hide();
      $('#exit_moderator').show();
      $('#enter_moderator').hide();
    } else {
      alert('Пароль не правильный');
    }


    $('#exit_moderator').click(() => {
      sessionStorage.removeItem('moderator');
      $('#enter_moderator').fadeIn(200);
      $('#exit_moderator').hide();
      $('.delete_theme').hide();
      $('.delete_section').hide();


      //для удаления коммента


    })
  }

  /* delete_theme: function() {
   let arr = $(e.currentTarget).parent().siblings();
   const section_name = $(arr[0]).text();



   /*fetch('api/themes/' + theme_name, {method: "DELETE"}).
   then(response => response.json()).
   then( ()=> {
   new showSections().show();
   });


   }*/


})
