import {Collection} from 'backbone';
import Comment from '../models/comment';

export default Collection.extend({
  model : Comment,
  theme: null,
  initialize: function (theme) {
    this.theme = theme;
  },
  url: function () {
    return 'api/themes/' + this.theme +'/comments';
  }
})
