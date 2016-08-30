import {Collection} from 'backbone';
import Theme from '../models/theme';

export default Collection.extend({
  model : Theme,
  section: null,
  initialize: function (section) {
    this.section = section;
  },
  url: function () {
    return '/api/sections/' + this.section + '/themes';
  }
})
