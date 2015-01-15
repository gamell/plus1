// Home Route
Router.route('/', function () {
  this.render('home');
  SEO.set({ title: 'Home - ' + Meteor.App.NAME });
});

// Event route
Router.route('/:eventId', function () {
    Meteor.subscribe("Events");
    Meteor.subscribe("Sentiments");
    var eventId = this.params.eventId;
    var e = Events.findOne({eventId : eventId});
    if (!!e){
        var title = e.name + ' - ' + Meteor.App.NAME;
        this.render('eventTemplate', {
            data: {
               title: title,
               subtitle: e.name,
               e: e,
            }
        });
        SEO.set({ title: title });  
    } else {
        this.render('notFound');
    }
});