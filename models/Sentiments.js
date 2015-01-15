Sentiments = new Mongo.Collection('sentiments');

Sentiments.attachSchema(
    new SimpleSchema({
    eventId: {
      type: String
    },
    title: {
      type: String,
      optional: true
    },
    iteration: {
      type: Number
    },
    plusOnes: {
      type: Number,
      min: 0
    },
    minusOnes: {
      type: Number
    },
    createdAt: {
      type: Date,
      denyUpdate: true
    }
  })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  Sentiments.allow({
    insert : function () {
      return true;
    },
    update : function () {
      return true;
    },
    remove : function () {
      return true;
    }
  });
}
