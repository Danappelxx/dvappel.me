// subscriptions, basic Meteor.startup code.
Meteor.startup( function () {
	// ...
});

Meteor.subscribe('chatrooms');

Meteor.subscribe('messages');

Meteor.subscribe('todolists');

// For {{> blogIndex }} to work on homepage
Meteor.subscribe('posts', Blog.settings.pageSize);
Meteor.subscribe('authors');