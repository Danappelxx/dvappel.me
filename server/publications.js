// Meteor.publish definitions


// Chatroom
Meteor.publish('chatrooms', function () {
	return Chatrooms.find();
});

Meteor.publish('messages', function () {
	return Messages.find();
});


// Nested Todo-list
Meteor.publish('todolists', function () {
	return Todolists.find();
});