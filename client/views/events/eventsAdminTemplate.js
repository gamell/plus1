// set user to admin by default
Session.setDefault("currentUser", "admin");

// This code only runs on the client
Template.eventsAdminTemplate.helpers({
    eventList: function () {
        return Events.find({}, {sort: {createdAt: -1}});
    }
});

Template.eventsAdminTemplate.events({

    "submit .new-event": function (event) {
    // This function is called when the new task form is submitted

        var eventName = event.target.text.value;

        var getEventId = function(eventName){
            return eventName.replace(/ /g,"-");
        };

        Events.insert({
            eventId: getEventId(eventName), 
            name: eventName,
            owner: Session.get("currentUser"),
            createdAt: new Date() // current time
        });

        // Clear form
        event.target.text.value = "";

        // Prevent default form submit
        return false;
    },

    "click .delete": function (event) {

        Events.remove(this._id);
        return false;

    }

});