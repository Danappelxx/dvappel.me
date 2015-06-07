Template.navbar.helpers({
	blogUrl: '/blog',
	isAdmin: function () {
		return Roles.userIsInRole(Meteor.user(), ['admin']);
	},
	canEditBlog: function () {
		return Roles.userIsInRole(Meteor.user(), ['blogAuthor']);
	}
});

Template.navbar.rendered = function () {
	var dropdown = $('#login-dropdown-list .dropdown-toggle');
	dropdown.addClass('hvr-underline-reveal');
};