import {Model} from 'backbone';

export default class Section extends Model{
  initialize(options) {
    this.set('name', options.name);
  }

  defaults() {
    return {
      name: 'Section-name'
    }
  }
}
