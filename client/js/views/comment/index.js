import $ from 'jquery';
import Backbone from 'backbone';
import tmpl from  './comment.ejs';
import CommentsCollection from '../../collections/comments';
import CommentsView from '../comments/index';
import SectionView from '../section/index';
import _ from 'underscore';
import moment from 'moment';
import tmpl_comment from '../comments/comments.ejs';

let CommentList = Backbone.View.extend({

  events: {
    'click .back' : 'back',
    'click .add_response' : 'add_response',
    'click #arrow' : 'arrow'
  },

  template: tmpl,

  initialize: function () {
    const theme =  sessionStorage.getItem('theme');
    this.$el.html(this.template({theme: theme}));
    this.coll = new CommentsCollection(theme);

    this.listenTo(this.coll, 'change', this.render);
    this.listenTo(this.coll, 'sync', this.render);
    this.listenTo(this.coll, 'create', this.render);

    this.coll.fetch();

  },

  render: function () {


    $('.all_commentaries').html('');
    const comment = this.$('.all_commentaries');

    $('.random').text(Math.round(Math.random()*1000));

    const models = this.coll.models;
    for(let i = models.length-1; i >=0; i--){
      const modelView = new CommentsView({
        model: models[i]
      });

      modelView.render();
      comment.append(modelView.$el);
    }

    if (sessionStorage.getItem('moderator')){
      $('#enter_moderator').hide();
      $('.delete').show();
    }

   /* const st = $(window).scrollTop();
    $(window).scroll(() => {
      if (st > -80) {
        $('#arrow').fadeIn('normal');
      } else {
        $('#arrow').fadeOut('normal');
      }
    });*/
    $('#arrow').fadeIn('normal');
    
  },

  add_response: function(){

    let next_message = $('.next_message');
    let current =  moment().format();
    const theme_name = $('#commentsHead > h2').text();
    let text = next_message.val();
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

    this.coll.create({date: current, text: text});
    next_message.val('');
    $('.captcha').val('');
  },

  arrow: function(){
      $('body,html').animate({"scrollTop" : 0}, "normal");
  },

  back: function() {
    Backbone.history.navigate('sections', {trigger: true});
    $('.back').fadeOut(200);
  }

});

export default CommentList;
