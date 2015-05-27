Template.footer.helpers({
	blogUrl: '/blog',
	isAdmin: function () {
		return Roles.userIsInRole(Meteor.user(), ['admin']);
	},
	canEditBlog: function () {
		return Roles.userIsInRole(Meteor.user(), ['blogAuthor']);
	}
});