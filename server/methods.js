// Meteor.method definitions
Meteor.methods({
	// Github Line Counter
	addFile: function (fileUrl) {
		this.unblock();
		var lineCount;

		try {

			var result = HTTP.get(fileUrl);

			lineCount = result.content.split('\n').length;

		} catch (e) {
			return false;
		}

		return lineCount;
	},
	appendGithubClientStuffs: function (baseUrl) {

		if(baseUrl.endsWith('?ref=master')) {
			baseUrl += '&';
		} else {
			baseUrl += '?';
		}

		var fullUrl = baseUrl + 'client_id=' + GITLINECOUNTER_CLIENT_ID + '&client_secret=' + GITLINECOUNTER_CLIENT_SECRET;
		return fullUrl;
	},

	// Chatroom
	newMessage: function (messageContent, roomId) {
		if (! Meteor.userId()) {
			throw new Meteor.Error('not-authorized', 'user is not logged in');
		}
		if (messageContent === '') {
			throw new Meteor.Error('empty-message', 'the submitted message is empty');
		}

		var username;
		if (Meteor.user().services.github) {
			username = Meteor.user().services.github.username;
		} else if (Meteor.user().profile.name) {
			username = Meteor.user().profile.name;
		} else if (Meteor.user().emails) {
			username = Meteor.user().emails[0].address;
		} else {
			username = 'unknown';
		}

		Messages.insert({
			message: messageContent,
			sent: new Date(),
			user: Meteor.userId(),
			username: username,
			roomId: roomId,
		});
	},
	removeMessage: function (messageId, roomId) {
		if(!Meteor.user()) {
			// not a user
			throw new Meteor.Error('not-logged-in', 'not logged in');
		}
		if ( _.contains(Meteor.user().roles, 'admin')  ) {
			// user is admin
			Messages.remove(messageId);
			return true;
		}

		var userId = Meteor.userId();
		var curr_rom = Chatrooms.findOne({_id: roomId});  // Get current chatroom
		moderators = curr_rom.moderators;

		var isMod = moderators.some( function (moderator) { // return true if any of the moderators match the current user
			return moderator._id == userId;
		});

		if (isMod) {
			Messages.remove(messageId);
		} else {
			throw new Meteor.Error('not-authorized', 'not a chat moderator');
		}
	},
	createChatroom: function (roomName) {

		if(! Meteor.userId()) {
			throw new Meteor.Error('not-authorized', 'user is not logged in');
		}

		if( Chatrooms.findOne({'roomName': roomName}) ) {
			throw new Meteor.Error('room-exists', 'chatroom with same name exists');
		} else {
			Chatrooms.insert({
				roomName: roomName,
				users: [],
				moderators: [
					Meteor.user(),
				],
				createdAt: new Date()
			});
		}
	},
	addUserToRoom: function (roomId) {

		Chatrooms.upsert(
			{
				// Selector
				_id: roomId
			},
			{
				// Modifier
				$addToSet: {
					users: Meteor.user()
				}
			}
		);

	},
	removeChatroom: function (roomId) {
		Chatrooms.remove(roomId);
		Messages.remove({'roomId': roomId});
	}
});