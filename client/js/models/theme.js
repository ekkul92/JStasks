import {Model} from 'backbone';
import $ from 'jquery';

export default class Theme extends Model {
  initialize(options) {
    this.set('name', options.name);
    this.set('answ_count', options.answ_count);
  }

  defaults() {
    return {
      name: 'Theme-name',
      answ_count: 0
    }
  }


}

Theme.prototype.addTheme = function (section, theme_name, comment) {

  fetch( 'api/sections/' + section + '/themes',
    {method: "POST",
      headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
      body : "name=" + theme_name
    }).then((response) => {

    if (response.status >= 200 && response.status < 300) {

      return response;

    }
    const error = new Error(response.statusText);

    error.response = response;
    throw error;

  }).
  then(()=>{
    fetch('api/themes/' + theme_name + '/comments',{
      method: "POST",
      headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
      body: "text=" + comment + '&date=' + (new Date())
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {

        return response;

      }
      const error = new Error(response.statusText);

      error.response = response;
      throw error;

    });
  });

};
