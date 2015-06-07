/* TODO
	*
*/



// Messages
Controller('messages', {
	helpers: {
		messages: function () {
			var currRoomId = Session.get('currRoom');
			return Messages.find({'roomId': currRoomId});
		},
	},
});

// Message
Controller('message', {
  helpers: {
	isModOrAdmin: function () {
		return isModOrAdmin(this);
	},
  },
  events: {
	'click a': function (event) {

		event.preventDefault();

		Meteor.call('removeMessage', this._id, this.roomId, function (error, result) {

			if (!error)
				sAlert.success('Message removed!', {position: 'top-right', 'stack': true});
			else {
				if ( error.error === 'not-logged-in')
					sAlert.error('You need to log in first (Scroll back to the top)');
				if ( error.error === 'not-authorized')
					sAlert.error('You have to be a chat moderator', {position: 'top-right', 'stack': true});
			}

		});

		return false;
	}
  }
});


// New Message
Controller('newMessage', {
	events: {
		// Send message
		'submit .new-message': function (event) {

			var message = event.target.text.value;
			var roomId = Session.get('currRoom');

			Meteor.call('newMessage', message, roomId, function (error, result) {
				if (!error) {
					//celebrate!
					sAlert.success('Sent message!', {position: 'top-right', 'stack': true});
				} else {
					if ( error.error === 'not-authorized')
						sAlert.error('You need to log in first (Scroll back to the top)');
					if ( error.error === 'empty-message')
						sAlert.error('Your message is empty!', {position: 'top-right', 'stack': true});
				}
			});

			event.target.text.value = "";

			return false;
		}
	}
});

// Chatroom list
Controller('chatroomList', {
	created: function () {
		if( Chatrooms.findOne())
			Session.set('currRoom',Chatrooms.findOne()._id);
	},

	helpers: {
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
	},

	events: {
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
					sAlert.success('Removed chatroom!', {position: 'top-right', 'stack': true});
				} else {
					// if (error.error === '') {
					// 	sAlert.error('');
					// }
				}
			});

			return false;
		}
	}
});

// New Chatroom
Controller('newChatroom', {
	events: {
		'click a': function (event) {
			event.preventDefault();

			var roomName = $("#new-chatroom-container input").val();

			if (roomName !== '') {

				Meteor.call('createChatroom', roomName, function (error, result) {
					if (!error) {
						sAlert.success('Created chatroom!', {position: 'top'});
					} else {
						if (error.error === 'not-authorized') {
							sAlert.error('You need to log in first (Scroll back to the top)');
						}
						if (error.error === 'room-exists')
							sAlert.error('A room with the same name already exists!', {position: 'top-right', stack: true});
					}
				});
			} else {

				sAlert.error('Chatroom name cannot be empty!', {position: 'top-right', 'stack': true});
			}

			return false;
		}
	}
});


function isModOrAdmin (that) {
	// where 'that' is 'this' from the viewpoint of a single message

	if(!Meteor.user()) {
		// user not logged in
		return false;
	}
	if ( _.contains(Meteor.user().roles, 'admin')  ) {
		// user is admin
		return true;
	}

	var userId = Meteor.userId(); // current user id

	var roomId = null;
	if(that.roomId) { // a room's _id would be the id we're looking for, but a message's _id wouldn't
		roomId = that.roomId;
	} else {
		roomId = that._id;
	}

	var curr_rom = Chatrooms.findOne({_id: roomId});  // Get current chatroom
	moderators = curr_rom.moderators;

	return moderators.some( function (moderator) { // return true if any of the moderators match the current user
		return moderator._id == userId;
	});
}