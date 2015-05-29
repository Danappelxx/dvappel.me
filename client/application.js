// subscriptions, basic Meteor.startup code.
Meteor.startup( function () {
	// ...
});

// Meteor.subscribe('chatroom');

Meteor.subscribe('chatrooms', {
	onReady: function () {
		Session.set('currRoom',Chatrooms.findOne()._id);
	}
});

Meteor.subscribe('messages');