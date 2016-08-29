import $ from 'jquery';
import Backbone from 'backbone';
import tmpl from  './section.ejs';
import SectionsCollection from '../../collections/sections';
import SectionsView from '../sections/index';
import ThemeList from '../theme/index';
import tmpl_modal from './modal.ejs';
import ModeratorView from '../moderator/index';
import _ from 'underscore';
import moment from 'moment';
import CommentList from '../comment/index';
import ForumRouter from '../../routers/navigate';

let sectionList = Backbone.View.extend({

  events: {
    'click td:first-child': 'navigation',
    'click .add_section': 'addSection'
  },

  template: tmpl,

  initialize: function () {

    //var currentTime = moment().format('YYYY MM DD');
    this.$el.html(this.template());
    this.coll = new SectionsCollection();

    this.listenTo(this.coll, 'sync', this.render);
    //this.listenTo(this.coll, 'create', this.addSection);

    this.listenTo(this.coll, 'create', this.render);


    this.coll.fetch();
    new ModeratorView({el: $('.for_moderator')});
  },

  render: function () {
    $('tbody').html('');
    const tbody = this.$('tbody');
    _.each(this.coll.models, function (model) {

      const modelView = new SectionsView({
        model: model
      });

      modelView.render();
      tbody.append(modelView.$el);
    }, this);


    if (sessionStorage.getItem('moderator')){
      $('#enter_moderator').hide();
      $('.delete_section').show();
      $('#exit_moderator').show().click(() => {
        sessionStorage.removeItem('moderator');
        $('#enter_moderator').fadeIn(200);
        $('#exit_moderator').hide();
        $('.delete_theme').hide();
        $('.delete_section').hide();
        //для удаления коммента
      })
    }
  },

  navigation: function (e) {
    const section_name = $(e.target).text();
    sessionStorage.setItem('section', section_name);

     Backbone.history.navigate('themes',  {trigger: true});
    //new ThemeList({el: $('.content')});
  },

  addSection: function () {
    let current =  moment().format('YYYY MM DD');
    var html = tmpl_modal();
    var t = $('.modal_section');
    t.html(html);
    t.fadeIn(200);
    $('#overlay').fadeIn(200).click(() => {
      $('#overlay').fadeOut(200);
      $('.modal_section').fadeOut(200);
    });

    $('.create_section').click(() => {
      let section_name = $('.modal_section > input').val();
      if (section_name === '') {
        alert('Введите название раздела!');
        return;
      }
      //console.log( this.coll.url());

      

      this.coll.create({name: section_name, date: current});


      //this.coll.add({name: section_name});

      /*fetch( 'api/sections/',
       {method: "POST",
       headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
       body : "name=" + section_name
       }).then((response) => {

       if (response.status >= 200 && response.status < 300) {

       return response;

       }
       const error = new Error(response.statusText);

       error.response = response;
       throw error;

       });
       */

      $('.modal_section').fadeOut(200);
      $('#overlay').fadeOut(200);

      //*************************************????????????
    })
  }
});

export default sectionList;
