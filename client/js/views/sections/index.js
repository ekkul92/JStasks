import {View} from 'backbone';
import tmpl from './sections.ejs';
import $ from 'jquery';

export default View.extend({
  tagName: 'tr',
  events: {
    'click .delete_section' : 'delete_section'
  },

  initialize: function() {
    this.template = tmpl;
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
  },

  render: function() {
    var html = this.template(this.model.toJSON());
    this.$el.append(html);
  },

  delete_section: function() {
    this.model.idAttribute = 'name';
    this.model.destroy();
  }

})
