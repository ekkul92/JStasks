
import $ from 'jquery';
import Router from './router';

const exitSystem = () => {

  const username = $('.user-name').text();

  //fetch( "/api/activeUsers/" + username, {method: "DELETE"});

  sessionStorage.clear();
  Router.navigate('auth');

};

export default {exitSystem};
