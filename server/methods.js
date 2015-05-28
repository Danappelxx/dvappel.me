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

	// Projects page
	getProjectList: function () {
		return JSON.parse(Assets.getText('projects.json'));
	},

	// Chatroom
	newMessage: function (messageContent, roomName) {
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
			roomName: roomName,
		});
	},
	removeMessage: function (messageId) {
		if(!_.contains(Meteor.user().roles, 'chatMod')) { // not chat moderator
			throw new Meteor.error('not-authorized', 'user is not a chat moderator');
		}
		Chatroom.remove(messageId);
	},
	createChatroom: function (roomName) {
		if( Chatrooms.findOne({'roomName': roomName}) ) {
			return false;
		} else {
			Chatrooms.insert({
				roomName: roomName,
				users: []
			});
		}
	},
	addUserToRoom: function (roomName) {

		Chatrooms.upsert(
			{
				// Selector
				roomName: roomName
			},
			{
				// Modifier
				$push: {
					users: Meteor.user()
				}
			}
		);

	}
});

// Chat rooms
// 		Chat Room
// 			Messages
// 				Message Content
// 				Username
// 				User id
// 				Timestamp
// 			Users online?
// 				Username
// 				User id

// In JSON:

// [
// 	{
// 		roomName: "...",
// 		messages: [
// 			{
// 				// ...
// 			}
// 		],
// 		users: [
// 			{
// 				username: '...',
// 				userid: '...'
// 			}
// 		]
// 	}
// ]