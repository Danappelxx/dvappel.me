Template.messages.helpers({
	messages: function () {
		return Messages.find();
	},
});

Template.message.helpers({
	isModerator: function () {
		return _.contains(Meteor.user().roles, 'chatMod');
	},
});

Template.newMessage.events({
	'submit .new-message': function (event) {

		var message = event.target.text.value;
		var roomName = Session.get('currRoom');
		console.log('message');

		Meteor.call('newMessage', message, roomName, function (error, result) {

			if(!error) {
				//celebrate!
			}

			// if (!error) {
			// 	sAlert.success('Send message!', {position: 'top-right', 'stack': true});
			// } else {

			// 	if (error.error === 'not-authorized') {
			// 		sAlert.error('You need to log in first');
			// 	}
			// 	if (error.error === 'empty-message') {
			// 		sAlert.error('Your message was empty', {position: 'top-right', 'stack': true}); // put it top-right and stackable
			// 	}
			// }
		});

		event.target.text.value = "";

		return false;

	}
});