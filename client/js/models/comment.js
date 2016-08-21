import {Model} from 'backbone';

export default class Comment extends Model {
  initialize(options) {
    this.set('text', options.text);
  }

  defaults() {
    return {
      text: 'Text'
    }
  }
}


