Events = new Mongo.Collection('events');

Events.attachSchema(
    new SimpleSchema({
      eventId: {
        type: String,
        unique: true
      },
      name: {
        type: String
      },
      owner: {
        type: String
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
  Events.allow({
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
