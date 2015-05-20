// Any helpers (handlebars or otherwise) that are used often in view files

Template.adminTemplate.helpers({
	isAdminUser: function() {
		return Roles.userIsInRole(Meteor.user(), ['admin']);
	},
	canEditBlog: function () {
		return Roles.userIsInRole(Meteor.user(), ['blogAuthor']);
	}
});

Template.navbar.helpers({
	blogUrl: '/blog',
	isAdmin: function () {
		return Roles.userIsInRole(Meteor.user(), ['admin']);
	},
	canEditBlog: function () {
		return Roles.userIsInRole(Meteor.user(), ['blogAuthor']);
	}
});

Template.footer.helpers({
	blogUrl: '/blog',
	isAdmin: function () {
		return Roles.userIsInRole(Meteor.user(), ['admin']);
	},
	canEditBlog: function () {
		return Roles.userIsInRole(Meteor.user(), ['blogAuthor']);
	}
});

Template.codepad.helpers({
        config: function () {
                return function (editor) {
                        editor.setTheme('ace/theme/monokai');
                        editor.getSession().setMode('ace/mode/javascript');
                        editor.setShowPrintMargin(false);
                        editor.getSession().setUseWrapMode(true);
                };
        },
        docid: function () {
                return Session.get('padid');
        }
});
