import { Model } from 'backbone';
import { Collection } from 'backbone';
import $ from 'jquery';
import tmpl_head from "../templates/head_comment.ejs";
import tmpl_comment from "../templates/all_comments.ejs";
import Moderator from './moderator';


const scroll = (theme_name) => {
  const st = $(window).scrollTop();
  const len = $('.all_commentaries').children().length;

  if (st > $('.commentaries').height() / 6){
    fetch('api/themes/' + theme_name +'/comments?filter[limit]=10&filter[order]=date%20DESC&' +
      'filter[skip]=' + len).
    then(response => response.json()).
    then(data => {
      if (data.length === 0){
        return;
      }
      const html = tmpl_comment({items: data});
      $('.all_commentaries').append(html);
      if (sessionStorage.getItem('moderator')){
        $('.delete').show().click((e) => {
          new Moderator().delete_comment(e);
        });
      }
    });
  }

  if (st > $(window).height() / 3){
    $('#arrow').fadeIn('normal');
  } else {
    $('#arrow').fadeOut('normal');
  }
};

export default class Comments extends Model{

  initialize(theme_name) {
    this.theme_name = theme_name;
  }

  add_response () {
      const theme_name = $('#commentsHead > h2').text();
      let text = $('.next_message').val();
      text = $.trim(text);

      if (text === "") {
        alert('Пожалуйста,напишите в поле для сообщения что-нибудь!');
        return;
      }

      let captcha = $('.captcha').val();
      captcha = $.trim(captcha);

      if (captcha !== $('.random').text()) {
        alert('Не правильно введено число! Попробуйте ещё раз!');
        $('.captcha').val('');
        return;
      }

      fetch('api/themes/' + theme_name + '/comments', {
        method: "POST",
        headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
        body: 'text=' + text + '&date=' + (new Date())
      }).then((response) => {

        if (response.status >= 200 && response.status < 300) {

          return response;

        }
        const error = new Error(response.statusText);

        error.response = response;
        throw error;

      }).then(() => {
        new Comments(theme_name).show();
      });
  }

  show() {

      const theme_name = this.theme_name;
    //console.log(this);
      fetch('api/themes/' + theme_name +'/comments?filter[limit]=10&filter[order]=date%20DESC').
      then(response => response.json()).
      then(data => {

        let html = tmpl_head({ theme_name: theme_name});
        $('.commentaries').html(html);
        $('.random').text(Math.round(Math.random()*1000));

        html = tmpl_comment({items: data});
        $('.all_commentaries').html(html);

        if (sessionStorage.getItem('moderator')){
          $('.delete').show().click((e) => {
            new Moderator().delete_comment(e);
          });
        }

        $('.commentaries').fadeIn(200);
        $('.tables').hide();

        $('.back').click(() => {
          $(".commentaries").hide();
          $('.tables').fadeIn(200);
        });

        $('.add_response').click( this.add_response);

        $('#arrow').click(() => {
          $('body,html').animate({"scrollTop" : 0}, "normal");
        });

        $(window).scroll(() => {
          scroll(theme_name);
        });
      });
    }
}

