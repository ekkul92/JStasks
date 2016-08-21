import {Collection} from 'backbone';
import Theme from '../models/theme';

export default class Themes extends Collection{
  initialize() {
    this.model = Theme;
  }
}
