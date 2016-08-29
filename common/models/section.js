const moment = require('moment');

module.exports = function(Section) {
  Section.on('attached', function () {
    Section.create({name: "Section1", date:  moment().format('YYYY MM DD')});
    Section.create({name: "Section2", date: moment().format('YYYY MM DD')});
  });
};
