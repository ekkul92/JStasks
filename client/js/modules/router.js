import $ from 'jquery';

const element = $('#app');

const Router = {

  views: [],

  currentView: null,


  addView(name, view) {
    this.views[name] = view;
  },

  navigate(route, params) {

    history.pushState( null, null, route );

    if (this.currentView !== null && this.currentView.destroy) {
      this.currentView.destroy();
    }

    this.currentView = new this.views[route](element, params);

    if (this.currentView.fetch) {
      this.currentView.
      fetch().
      then(() => this.currentView.render());
    } else {
      this.currentView.render();
    }

    this.currentView.createEvents();

  }
};

export default Router;
