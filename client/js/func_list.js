var $ = require('jquery');
var _ = require('lodash');

var showFL = require('./modules/ShowApplicationList.js');
var showAP = require('./modules/showAdminPanel.js');
var Filter = require('./modules/Filter.js');
var Search = require('./modules/Search.js');
var App = require('./modules/App.js');

var aut = require('./modules/Authorization.js');
var reg = require('./modules/Registration.js');

module.exports = {
  //показать список заявок
  showApplicationList: showFL.showApplicationList,

  //Вход в систему
  enterSystem: aut.enterSystem,

  //Выход из системы
  exitSystem: aut.exitSystem,

  //Панель Админа
  showAdminPanel: showAP.showAdminPanel,

  //Показать форму добавления исполнителя
  showFormForContr: showAP.showFormForContr,

  //Показать форму авторизации
  showAuthForm: aut.showAuthForm,

  //Показать форму регистрации
  showRegistrationForm: reg.showRegistrationForm,

  //Показать форму создания заявки
  showFormForAddApp: App.showFormForAddApp,

  //Создание заявки
  createApp: App.createApp,

  //Зaкрытие мoдaльнoгo oкнa
  closeModal: App.closeModal,

  //Добавить исполнителя
  addContr: showAP.addContr,

  //Показать форму назначения исполнителя
  showFormForAddContr: showAP.showFormForAddContr,

  //Показать форму для фильтра
  filter: Filter.filter,

  //Показать результат фильтра
  showFilter: Filter.showFilter,

  //Отмена фильтра
  cancelFilter: Filter.cancelFilter,

  //Показать форму поиска
  showFormForSearch: Search.showFormForSearch,

  //Показать результаты поиска
  searchApps: Search.searchApps,

  //Отмена поиска
  cancelSearch: Search.cancelSearch
};
