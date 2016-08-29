import {View} from 'backbone';
import tmpl from './comments.ejs';
import $ from 'jquery';

export default View.extend({

  tagName: 'div',
  className: 'comment',

  events: {
    'click .delete': 'delete_comment'
  },

  initialize: function() {

    this.template = tmpl;
    this.listenTo(this.model, 'change', this.render);

    this.listenTo(this.model, 'destroy', this.remove);
  },

  render: function() {
    var html = this.template(this.model.toJSON());
    this.$el.html(html);
  },

  delete_comment: function(){
    this.model.idAttribute = 'id';
    this.model.destroy();
  }

})
