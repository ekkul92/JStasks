const moment = require('moment');

module.exports = function(Theme) {
  Theme.on('attached', function () {
    Theme.create({name: 'theme1', sectionId: 'Section1', date: moment().format('YYYY MM DD')});
    Theme.create({name: 'theme2', sectionId: 'Section1', date: moment().format('YYYY MM DD')});
    Theme.create({name: 'theme3', sectionId: 'Section2', date: moment().format('YYYY MM DD')});
    Theme.create({name: 'theme4', sectionId: 'Section2', date: moment().format('YYYY MM DD')});
  });
};
