module.exports = function(Comment) {
  Comment.on('attached', function (){
    var d = new Date();
    Comment.create({ text: "First message", themeId: 'theme1',
          date : d});
    Comment.create({ text: "First message", themeId: 'theme2',
          date: d});
    Comment.create({ text: "First message", themeId: 'theme3',
      date : d});
    Comment.create({ text: "First message", themeId: 'theme4',
      date : d});
  });
};
