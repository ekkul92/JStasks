module.exports = function(Section) {
  Section.on('attached', function () {
    Section.create({name: "Section1"});
    Section.create({name: "Section2"});
  });
};
