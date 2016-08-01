
import './../css/index.css';

import $ from 'jquery';
import AppsList from './modules/AppsList.js';
import Auth from './modules/Auth';
import Reg from './modules/Reg.js';
import Router from './modules/router.js';

  Router.addView('auth', Auth);
  Router.addView('reg', Reg);
  Router.addView('app', AppsList);

  Router.navigate();
