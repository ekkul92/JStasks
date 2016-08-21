import {View} from 'backbone';
import $ from 'jquery';
import SectionView from './sectionView';
import Section from '../models/section';

export default class ForumView extends View {
  initialize() {
    this.$el = $('.tables');

    let view = new SectionView({model: Section});
  }
}
