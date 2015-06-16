// Configuration of any client side packages

sAlert.config({
	effect: 'genie',
	position: 'top',
	timeout: 3000,
	html: false,
	onRouteClose: true,
	stack: false,
	offset: 0
});

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
	blogNotFoundTemplate: 'notFound',
	syntaxHighlighting: true,
	syntaxHighlightingTheme: 'zenburn',
	adminRole: 'blogAdmin',
	authorRole: 'blogAuthor',
});