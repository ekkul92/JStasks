
import $ from 'jquery';

const exitSystem = () => {

  const username = $('.user-name').text();

  fetch( "/api/activeUsers/" + username, {method: "DELETE"}).
     then(() => {

    $('#applicationsList').hide();
    $('#logIn_form').show();
    $('.apps').html();
    $('#empty-list').hide();
    $('.admin-panel').hide();

  });

};

export default {exitSystem};
