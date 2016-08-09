
import './../css/index.css';
import {combineReducers, createStore} from 'redux';

import AppsList from './modules/AppsList.js';
import Auth from './modules/Auth';
import Reg from './modules/Reg.js';
import Router from './modules/router.js';

  Router.addView('auth', Auth);
  Router.addView('reg', Reg);
  Router.addView('app', AppsList);

  Router.navigate(history.state ? (history.state.page === 'app' ? 'auth' : history.state.page) : 'auth');

  window.addEventListener('popstate', (e) => {
    Router.navigate(e.state ? e.state.page : 'auth');
  });
