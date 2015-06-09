// subscriptions, basic Meteor.startup code.
Meteor.startup( function () {
	// ...
});

Meteor.subscribe('chatrooms');

Meteor.subscribe('messages');

Meteor.subscribe('todolists');