Meteor.publish('Polls', function () {
  return Polls.find();
});
