import $ from 'jquery';
import tmpl from '../templates/moderator_window.ejs';
import Comments from './Comments';
import showSections from './showSections';

const enter = () => {
  let password = $('.password').val();
  password = $.trim(password);

  if (password === '1') {
    sessionStorage.setItem('moderator', '1');
    $('.delete').show().click((e) => {
      new Moderator().delete_comment(e);
    });
    $('.delete_theme').show().click((e) => {
      new Moderator().delete_theme(e);
    });
    $('#overlay').hide();
    $('.window_moderator').hide();
    $('#exit_moderator').show();
    $('#enter_moderator').hide();
  } else {
    alert('Пароль не правильный');
  }
};

export default class Moderator{

  showWindow(){

    let html = tmpl({});
    $('.window_moderator').html(html).fadeIn('normal');

    $("#overlay").show().click(() => {
      $(".window_moderator").hide();
      $("#overlay").hide();
    });
    $('.enter').click(enter);
  }

   delete_comment(e){

     let arr = $(e.currentTarget).siblings();
     const current_h4 = $(arr[1]).text();
     const current_date = $(arr[0]).text();
     const theme_name = $('#commentsHead > h2').text();
     fetch('api/comments/?filter[where][text]=' + current_h4 + '&filter[where][date]=' + current_date +
        '&filter[where][themeId]=' + theme_name ).
     then(response => response.json()).
     then(data => {
       const id = data[0].id;
       fetch('api/comments/' + id, {method: "DELETE"}).
       then(response => response.json()).
       then( ()=> {
         new Comments(theme_name).show();
       });
     });

  }

  delete_theme(e){
      let arr = $(e.currentTarget).parent().siblings();
      const theme_name = $(arr[0]).text();

      fetch('api/themes/' + theme_name, {method: "DELETE"}).
      then(response => response.json()).
      then( ()=> {
        new showSections().show();
      });
  }
}



