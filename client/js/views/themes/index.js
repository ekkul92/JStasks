import {View} from 'backbone';
import tmpl from './themes.ejs';
import $ from 'jquery';

export default View.extend({
  tagName: 'tr',
  events: {
    'click .delete_theme': 'delete_theme'
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

  delete_theme: function(){

    this.model.idAttribute = 'name';
    this.model.destroy();
    /*fetch('api/themes/' + theme_name, {method: "DELETE"}).
     then(response => response.json()).
     then( ()=> {
     new showSections().show();
     });
     */
  }



})
