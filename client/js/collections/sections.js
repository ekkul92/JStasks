import {Collection} from 'backbone';
import Section from '../models/section';

export default class Sections extends Collection{
  initialize() {
    this.model = Section;
  }
}
