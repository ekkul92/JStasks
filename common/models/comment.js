const moment = require('moment');

module.exports = function(Comment) {
  Comment.on('attached', function (){

    Comment.create({ text: "First message", themeId: 'theme1',
          date : moment().format()});
    Comment.create({ text: "First message", themeId: 'theme2',
          date: moment().format()});
    Comment.create({ text: "First message", themeId: 'theme3',
      date : moment().format()});
    Comment.create({ text: "First message", themeId: 'theme4',
      date : moment().format()});
  });
};
