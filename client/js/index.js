import './../css/index.css';
import $ from 'jquery';
import IndexRouter from './routers/index';
import  ForumRouter from './routers/navigate';

const router = new IndexRouter();
const nav = new ForumRouter();
Backbone.history.start({pushState: true});
