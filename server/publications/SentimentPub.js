Meteor.publish('Sentiments', function () {
  return Sentiments.find();
});
