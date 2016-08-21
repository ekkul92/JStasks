import {View} from 'backbone';
import $ from "jquery";
import tmpl from "./../templates/sectionsList.ejs";
import tmplButt from "./../templates/moderatorButtons.ejs";
import Moderator from '../modules/moderator';
import Theme from './newThemeView';
import Section from '../models/section';

export  default class SectionView extends View{

  initialize() {
    this.$el = $('.tables');

    this.listenTo(this.model, 'change', this.render);
  }

  render(){
    const arr = [];

    fetch('api/sections/').
    then((response) => response.json()).
    then(data => {

      const promiseList = [];

      data.forEach(section => {

        let obj = {
          section: section.name,
          themes: []
        };

        const promise = fetch( 'api/sections/' + section.name + '/themes' )
          .then(response => response.json())
          .then(data => {
            return {
              obj, data
            };
          });

        promiseList.push(promise);
        arr.push(obj);
      });
      return Promise.all(promiseList);
    }).then(dataList => {
      const promiseList = [];

      for (const dataElem of dataList) {
        const {data, obj} = dataElem;

        data.forEach(theme => {
          const promise = fetch( 'api/themes/' + theme.name + '/comments/count' )
            .then(response => response.json())
            .then(data => obj.themes.push( {theme: theme.name, count: data.count} ));

          promiseList.push(promise);
        });
      }

      return Promise.all(promiseList);
    })
      .then(() => {
        let html = tmpl( {items: arr} );
        this.$el.html(html);

        html = tmplButt({});
        $('.for_moderator').html(html);

        $('#exit_moderator').click(() => {
          $('#exit_moderator').hide();
          $('#enter_moderator').show();
          $('.delete').hide();
          $('.delete_theme').hide();
          sessionStorage.removeItem('moderator');
        });

        if (sessionStorage.getItem('moderator')){
          $('#exit_moderator').show();
          $('#enter_moderator').hide();
          $('.delete_theme').show().click((e) => {
            new Moderator().delete_theme(e);
          });

        } else{
          $('#exit_moderator').hide();
          $('#enter_moderator').show();
        }

        $('.add_theme').click((e) => {
          new Theme().showForm(e);
        });


        $('td:first-child').click((e) => {
          new Comments($(e.target).text()).show();                     //*****************
        });
      });
  }
}

SectionView.prototype.events = {
  'click #enter_moderator': 'enterModerator',
  'click .enter' : 'enter'
};

SectionView.prototype.enterModerator =  function() {
  let html = tmpl({});
  $('.window_moderator').html(html).fadeIn('normal');

  $("#overlay").show().click(() => {
    $(".window_moderator").hide();
    $("#overlay").hide();
  });
};

SectionView.prototype.enter =  function() {
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
