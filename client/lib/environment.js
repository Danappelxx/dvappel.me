// Configuration of any client side packages

Accounts.ui.config({
	requestPermissions: {},
	passwordSignupFields: "EMAIL_ONLY"
});

Blog.config({
	comments: {
		disqusShortname: 'dvappel',
	},
	blogIndexTemplate: 'blogIndexTemplate',
	blogShowTemplate: 'showBlogTemplate',
//	blogNotFoundTemplate: 'blogNotFound',
	syntaxHighlighting: true,
	syntaxHighlightingTheme: 'github',
	adminRole: 'blogAdmin',
	authorRole: 'blogAuthor',
});

Router.configure({
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	layoutTemplate: 'layout'
});

Router.map(function () {

	// Base site
	this.route('home', {
		path: '/'
	});
	this.route('resume', {
		path: '/projects'
	});
	this.route('about', {
		path: '/about'
	});
	this.route('contact', {
		path: '/contact'
	});
	this.route('admin', {
		path: '/admin',
		template: 'accountsAdmin',
		onBeforeAction: function() {
			if(Meteor.loggingIn()) {
				this.render(this.loadingTemplate);
				this.next();
			} else if(Roles.userIsInRole(Meteor.user(), ['admin'])) {
				this.next();
			} else {
				this.redirect('/');
				this.next();
			}
		}
	});


	// // Codepad
	this.route('codepad-base', {
		path: '/codepad',
		template: 'codepadBase',
		data: {
			randDocid : function () {
				var randDocid = Random.id(5);
				return randDocid;
			}
		}
	});
	this.route('codepad', {
		path: '/codepad/:padid',
		template: 'codepad',
		onBeforeAction: function () {
			var padid = this.params.padid;
			Session.set('padid', padid);
			this.next();
		}
	});
});
