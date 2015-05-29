/* TODO
	* Make user mod if he creates room first
	* Require user to be logged in to create room
	* Add a configuration object for message limits, success & error callbacks, and
	*

*/


// Messages

Template.messages.helpers({
	// List messages
	messages: function () {
		var currRoomId = Session.get('currRoom');
		return Messages.find({'roomId': currRoomId});
	},
});

var isModOrAdmin = function (that) {
	if ( _.contains(Meteor.user().roles, 'admin')  ) {
		return true;
	} else {

		var chatroom = Chatrooms.findOne({_id: that._id})

		var moderators;

		if(chatroom) {
			moderators = chatroom.moderators;
		} else {
			return false;
		}

		var isMod = false;

		moderators.forEach( function (moderator) {
			var modId = moderator._id;
			var userId = Meteor.userId();

			if ( modId == userId ) {
				isMod = true;
			}
		});

		if (isMod) {
			return true;
		}
	}



	// else if ( _.contains(Chatrooms.find({'_id': Session.get('currRoom')}), Meteor.user() ) {
	// 	return true;
	// } else {
	// 	return false;
	// }
	return false;
}
Template.message.helpers({
	// Check if user is a chat moderator or an admin
	isModOrAdmin: function () {
		return isModOrAdmin(this);
	},
});

Template.newMessage.events({
	// Send message
	'submit .new-message': function (event) {

		var message = event.target.text.value;
		var roomId = Session.get('currRoom');

		Meteor.call('newMessage', message, roomId, function (error, result) {
			if(!error) {
				//celebrate!
			}
		});

		event.target.text.value = "";

		return false;

	}
});

Template.message.events({
	//
	'click a': function (event) {

		event.preventDefault();

		Meteor.call('removeMessage', this._id, function (error, result) {

			if (!error) {
				// Celebrate
			}

		});

		return false;
	}
});



// Chatrooms

Template.chatroomList.helpers({
	// Get all chatrooms
	chatrooms: function () {
		return Chatrooms.find({}, {
			sort: {
					createdAt: 1
			}
		});
	},
	// Check if user is a chat moderator or an admin
	isModOrAdmin: function () {
		return isModOrAdmin(this);
	},
	isActive: function (that) {
		if( this._id === Session.get('currRoom') ) {
			return true;
		} else {
			return false;
		}
	}
});

Template.chatroomList.events({
	'click .room-name': function (event) {
		event.preventDefault();

		var roomId = this._id;
		Session.set('currRoom', roomId);

		if( Meteor.user() ) {
			Meteor.call('addUserToRoom', roomId);
		}

		return false;
	},
	'click .remove-room': function (event) {
		event.preventDefault();

		Meteor.call('removeChatroom', this._id, function (error, result) {
			if (!error) {
				// Celebrate!
			}
		});

		return false;
	}
});

Template.newChatroom.events({
	'click button': function (event) {
		event.preventDefault();

		var roomName = $("#new-chatroom-container input").val();

		if (roomName !== '') {

			Meteor.call('createChatroom', roomName, function (error, result) {
				if(!error) {
					// Celebrate!
				}
			});
		} else {

		}

		return false;
	}
});