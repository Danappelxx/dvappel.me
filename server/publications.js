// Meteor.publish definitions
Meteor.publish('chatroom', function () {
	return Chatroom.find();
});