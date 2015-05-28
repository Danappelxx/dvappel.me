Template.chatroom.helpers({
	messages: function () {
		return Chatroom.find();
	},
});

Template.message.helpers({
	isModerator: function () {
		return _.contains(Meteor.user().roles, 'chatMod');
	},
});

Template.chatroom.events({
	'submit .new-message': function (event) {

		var message = event.target.text.value;

		Meteor.call('newMessage', message, function (error, result) {

			if (!error) {
				sAlert.success('Send message!', {position: 'top-right', 'stack': true});
			} else {

				if (error.error === 'not-authorized') {
					sAlert.error('You need to log in first');
				}
				if (error.error === 'empty-message') {
					sAlert.error('Your message was empty', {position: 'top-right', 'stack': true}); // put it top-right and stackable
				}
			}
		});

		event.target.text.value = "";

		return false;
	},
	'click .remove-message': function () {
		Meteor.call('removeMessage', this._id, function (error, result) {
			if (!error) {
				sAlert.success('Deleted message', {position: 'top-right', 'stack': true});
			} else {
				if( error.error === 'not-authorized') {
					sAlert.error('You need to be a moderator to do that');
				}
			}
		});
	}
});