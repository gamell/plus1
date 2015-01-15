Template.eventTemplate.helpers({
    sentimentList: function () {
        return Sentiments.find({eventId: this.e.eventId}, {sort: {createdAt: -1}});
    }
});

Template.eventTemplate.events({

    "submit.new-sentiment": function (event) {
        
        var sentimentTitle = event.target.text.value;

        var newSentiment = {
            eventId: this.e.eventId,
            title: sentimentTitle,
            plusOnes: 0,
            minusOnes: 0,
            iteration: 1,
            createdAt: new Date()
        };

        Sentiments.insert(newSentiment);

        // Clear form
        event.target.text.value = "";

        // Prevent default form submit
        return false;

    }   

});