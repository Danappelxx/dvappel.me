// Meteor.publish definitions
// Meteor.publish('chatroom', function () {
// 	return Chatroom.find();
// });

Meteor.publish('chatrooms', function () {
	return Chatrooms.find();
});

Meteor.publish('messages', function () {
	return Messages.find();
});