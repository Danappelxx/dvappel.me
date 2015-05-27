Template.adminTemplate.helpers({
	isAdminUser: function() {
		return Roles.userIsInRole(Meteor.user(), ['admin']);
	},
	canEditBlog: function () {
		return Roles.userIsInRole(Meteor.user(), ['blogAuthor']);
	}
});