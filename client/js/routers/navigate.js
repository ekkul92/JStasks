import SectionList from '../views/section/index';
import ThemeList from '../views/theme/index';
import CommentList from '../views/comment/index';
import { Router } from 'backbone';
import $ from 'jquery';

export default Router.extend({
  routes: {
    'sections': 'navigate_sections',
    'themes'  : 'navigate_themes',
    'comments': 'navigate_comments'
  },
  navigate_sections: function(){
    new SectionList({el : $('.content')});
  },

  navigate_themes: function(){
    new ThemeList({el: $('.content')});
  },

  navigate_comments: function(){
    new CommentList({el: $('.content')});
  }

})
