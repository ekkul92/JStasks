import $ from 'jquery'; 
import {View} from 'backbone';
import tmpl from "./../templates/newThemeForm.ejs";


const createTheme = () => {

  let theme_name = $("#theme").val();
  theme_name = $.trim(theme_name);

  let comment = $(".first_message").val();
  comment = $.trim(comment);

  const section = sessionStorage.getItem('current_section');
  const captcha = $('.captcha').val();

  if (theme_name === ''){
    alert('Напишите, пожалуйста, название темы! ');
    return;
  }
  if (comment === '') {
    alert('Пожалуйста,напишите в поле для сообщения что-нибудь!');
    return;
  }

  if (captcha !== $('.random').text()){
    alert('Не правильно введено число! Попробуйте ещё раз!');
    return;
  }

  fetch( 'api/sections/' + section + '/themes',
    {method: "POST",
      headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
      body : "name=" + theme_name
    }).then((response) => {

    if (response.status >= 200 && response.status < 300) {

      return response;

    }
    const error = new Error(response.statusText);

    error.response = response;
    throw error;

  }).
  then(()=>{

    fetch('api/themes/' + theme_name + '/comments',{
      method: "POST",
      headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
      body: "text=" + comment + '&date=' + (new Date())
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {

        return response;

      }
      const error = new Error(response.statusText);

      error.response = response;
      throw error;

    });

  });

  $(".new_theme").fadeOut(200);
  $("#overlay").hide();
};


export default class Theme extends View{

  showForm (e) {
    $("#theme").val('');
    $(".first_message").val('');
    $('.captcha').val('');

    sessionStorage.removeItem('current_section');
    sessionStorage.setItem('current_section', $(e.currentTarget).siblings().text());

    const html = tmpl({});
    let el = $('.new_theme');
    el.html(html);

    $('.random').text(Math.round(Math.random()*1000));
    el.fadeIn(250);

    $(".button_create").click(createTheme);

    $("#overlay").show().click(() => {
      $(".new_theme").hide();
      $("#overlay").hide();
    });
  }

}
