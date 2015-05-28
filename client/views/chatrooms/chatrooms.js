Template.chatroomList.helpers({
	chatrooms: function () {
		return Chatrooms.find();
	}
});

Template.chatroomList.events({
	'click a': function (event) {
		event.preventDefault();

		console.log(this);
		var roomName = this.roomName;
		Session.set('currRoom', roomName);

		Meteor.call('addUserToRoom', roomName);

		return false;
	}
});

Template.newChatroom.events({
	'click button': function (event) {
		event.preventDefault();

		var roomName = $("#new-chatroom-container input").val();
		Meteor.call('createChatroom', roomName, function (error, result) {
			if(!error) {
				// Celebrate!
			}
		});

		return false;
	}
});