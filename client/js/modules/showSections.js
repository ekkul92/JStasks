import $ from "jquery";
import _ from 'lodash';
import {Model} from 'backbone';
import tmpl from "./../templates/sectionsList.ejs";
import tmplButt from "./../templates/moderatorButtons.ejs";
import Comments from './Comments';
import Moderator from './moderator';
import newTheme from './newTheme';

export default class showSections extends Model{

  show(){

    const arr = [];

    fetch('api/sections/').
      then((response) => response.json()).
    then(data => {

      const promiseList = [];

      data.forEach(section => {

        let obj = {
          section: section.name,
          themes: []
        };

        const promise = fetch( 'api/sections/' + section.name + '/themes' )
          .then(response => response.json())
          .then(data => {
            return {
              obj, data
            };
          });

        promiseList.push(promise);
        arr.push(obj);
      });
      return Promise.all(promiseList);
    }).
    then(dataList => {
        const promiseList = [];

        for (const dataElem of dataList) {
          const {data, obj} = dataElem;

          data.forEach(theme => {
            const promise = fetch( 'api/themes/' + theme.name + '/comments/count' )
              .then(response => response.json())
              .then(data => obj.themes.push( {theme: theme.name, count: data.count} ));

            promiseList.push(promise);
          });
        }

        return Promise.all(promiseList);
      })
      .then(() => {
        let html = tmpl( {items: arr} );
        $('.tables').html(html);

        html = tmplButt({});
        $('.for_moderator').html(html);
        
        $('#enter_moderator').click( new Moderator().showWindow);
        $('#exit_moderator').click(() => {
          $('#exit_moderator').hide();
          $('#enter_moderator').show();
          $('.delete').hide();
          $('.delete_theme').hide();
          sessionStorage.removeItem('moderator');
        });

        if (sessionStorage.getItem('moderator')){
          $('#exit_moderator').show();
          $('#enter_moderator').hide();
          $('.delete_theme').show().click((e) => {
            new Moderator().delete_theme(e);
          });

        } else{
          $('#exit_moderator').hide();
          $('#enter_moderator').show();
        }

        $('.add_theme').click((e) => {
          new newTheme().showForm(e);
        });


        $('td:first-child').click((e) => {
           new Comments($(e.target).text()).show();
        });
      });
  }
}
