// var checkUserLoggedIn = function(){
//     if (!Meteor.userId()) {
//     // if the user is not logged in, render the Login template
//     this.render('Login');
//   } else {
//     // otherwise don't hold up the rest of hooks or our route/action function
//     // from running
//     this.next();
//   }
// };

// Router.onBeforeAction(checkUserLoggedIn, {
//   only: ['admin']
// });

// Router.route('/admin/*', function(){
//     this.render('/admin/events', {name: "admin"});

// });

Router.route('/admin/events', function () {
  Meteor.subscribe("Events");
  this.render('eventsAdminTemplate');
  SEO.set({ title: 'Events administration - ' + Meteor.App.NAME });
});
