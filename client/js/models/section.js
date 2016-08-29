import {Model} from 'backbone';

export default Model.extend({
  urlRoot: '/api/sections',
  defaults: {
      name: 'Section-name',
      date: 'Created-date'
  }
})
