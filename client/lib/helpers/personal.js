// Any helpers (handlebars or otherwise) that are used often in view files

Template.adminTemplate.helpers({
	isAdminUser: function() {
		return Roles.userIsInRole(Meteor.user(), ['admin']);
	}
});

Template.header.helpers({
	blogUrl: '/blog'
});

Template.footer.helpers({
	blogUrl: '/blog'
});

Template.codepad.helpers({
        config: function () {
                return function (editor) {
                        editor.setTheme('ace/theme/github');
                        editor.getSession().setMode('ace/mode/javascript');
                        editor.setShowPrintMargin(false);
                        editor.getSession().setUseWrapMode(true);
                };
        },
        docid: function () {
                return Session.get('padid');
        }
});

