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

			if (!error) {
				// Celebrate
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
				if(!error) {
					//celebrate!
				}
			});

			event.target.text.value = "";

			return false;
		}
	}
});

// Chatroom list
Controller('chatroomList', {
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
					// Celebrate!
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
					if(!error) {
						// Celebrate!
					}
				});
			} else {

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